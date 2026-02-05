// controllers/authController.js - Token registration (supports both Expo and FCM)
const { db } = require('../config/firebase');
const { Expo } = require('../config/expo');
const { ROLES, COLLECTIONS } = require('../utils/constants');
const { validateRequiredFields, isValidRole } = require('../utils/validators');

const { capitalizeFirst } = require('../utils/helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Register a new user (Driver or Parent)
 * POST /api/auth/register
 */
const register = async (req, res) => {
    console.log('➡️ Controller: register called');
    const { email, password, role, name, phone } = req.body;

    // Validate input
    const validation = validateRequiredFields(req.body, ['email', 'password', 'role', 'name']);
    if (!validation.isValid) {
        return res.status(400).json({ error: `Missing: ${validation.missingFields.join(', ')}` });
    }

    if (!isValidRole(role)) {
        return res.status(400).json({ error: 'Invalid role. Must be "driver" or "parent".' });
    }

    try {
        const collection = role === ROLES.DRIVER ? COLLECTIONS.DRIVERS : COLLECTIONS.PARENTS;

        // Check if user already exists
        const userSnapshot = await db.collection(collection).where('email', '==', email).get();
        if (!userSnapshot.empty) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate ID (In a real app, you might let Firestore generate it or use Firebase Auth UID)
        // For simplicity here, we'll create a new doc ref to get an ID
        const newDocRef = db.collection(collection).doc();
        const userId = newDocRef.id;

        const userData = {
            userId,
            email,
            password: hashedPassword, // Store hashed password
            name,
            phone: phone || '',
            role,
            createdAt: new Date().toISOString(),
            fcmToken: '',
            expoPushToken: ''
        };

        // Create user in Firestore
        await newDocRef.set(userData);

        console.log(`User registered: ${email} (${role})`);

        // Generate JWT Token
        console.log('🔑 Generating Token...');
        const token = jwt.sign(
            { userId: userData.userId, role: userData.role },
            process.env.JWT_SECRET || 'fallback_secret_key_do_not_use_in_production',
            { expiresIn: '30d' }
        );
        console.log('✅ Token Generated:', token.substring(0, 15) + '...');

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            userId: userId,
            token, // Return token
            name: userData.name,
            role: userData.role
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};

/**
 * Login user
 * POST /api/auth/login
 */
const login = async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ error: 'Missing email, password, or role' });
    }

    try {
        const collection = role === ROLES.DRIVER ? COLLECTIONS.DRIVERS : COLLECTIONS.PARENTS;

        // Find user by email
        const userSnapshot = await db.collection(collection).where('email', '==', email).limit(1).get();

        if (userSnapshot.empty) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();

        // Check password
        const validPassword = await bcrypt.compare(password, userData.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: userData.userId, role: userData.role },
            process.env.JWT_SECRET || 'fallback_secret_key_do_not_use_in_production',
            { expiresIn: '30d' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            userId: userData.userId,
            name: userData.name,
            role: userData.role
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
};

/**
 * Register FCM Push Token for parent or driver
 * POST /api/auth/register-token
 */
const registerToken = async (req, res) => {
    const { userId, role, fcmToken, expoPushToken } = req.body;

    // Support both fcmToken and expoPushToken for backward compatibility
    const token = fcmToken || expoPushToken;

    console.log('Token registration request:', { userId, role, tokenType: fcmToken ? 'FCM' : 'Expo' });

    const validation = validateRequiredFields(req.body, ['userId', 'role']);
    if (!validation.isValid) {
        return res.status(400).json({ error: `Missing: ${validation.missingFields.join(', ')}` });
    }

    if (!token) {
        return res.status(400).json({ error: 'Missing token. Provide fcmToken or expoPushToken' });
    }

    if (!isValidRole(role)) {
        return res.status(400).json({ error: 'Invalid role. Must be "driver" or "parent".' });
    }

    try {
        const collection = role === ROLES.DRIVER ? COLLECTIONS.DRIVERS : COLLECTIONS.PARENTS;

        const updateData = {
            userId: userId,
            role: role,
            tokenUpdatedAt: new Date().toISOString(),
        };

        // Store both tokens for flexibility
        if (fcmToken) {
            updateData.fcmToken = fcmToken;
        }
        if (expoPushToken) {
            updateData.expoPushToken = expoPushToken;
        }

        await db.collection(collection).doc(userId).set(updateData, { merge: true });

        console.log(`✅ Token registered for ${role}: ${userId}`);

        res.status(200).json({
            success: true,
            message: `${capitalizeFirst(role)} token registered successfully`,
            tokenType: fcmToken ? 'FCM' : 'Expo',
        });

    } catch (error) {
        console.error('Token registration error:', error);
        res.status(500).json({ error: 'Failed to register token', details: error.message });
    }
};

/**
 * Get user info by ID
 * GET /api/auth/user/:userId
 */
const getUserInfo = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.query;

    if (!userId || !role) {
        return res.status(400).json({ error: 'Missing userId or role' });
    }

    if (!isValidRole(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }

    try {
        const collection = role === ROLES.DRIVER ? COLLECTIONS.DRIVERS : COLLECTIONS.PARENTS;
        const doc = await db.collection(collection).doc(userId).get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Don't expose tokens in response
        const userData = doc.data();
        delete userData.fcmToken;
        delete userData.expoPushToken;

        res.status(200).json({ success: true, user: userData });

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user', details: error.message });
    }
};

module.exports = { registerToken, getUserInfo, login, register };
