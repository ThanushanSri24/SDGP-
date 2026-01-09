// controllers/authController.js - Token registration logic
const { db } = require('../config/firebase');
const { Expo } = require('../config/expo');
const { ROLES, COLLECTIONS } = require('../utils/constants');
const { validateRequiredFields, isValidRole } = require('../utils/validators');
const { capitalizeFirst } = require('../utils/helpers');

<<<<<<< HEAD
const registerToken = async (req, res) => {
    const { userId, role, expoPushToken } = req.body;
    console.log('Token registration:', { userId, role, expoPushToken });

    const validation = validateRequiredFields(req.body, ['userId', 'role', 'expoPushToken']);
    if (!validation.isValid) return res.status(400).json({ error: `Missing: ${validation.missingFields.join(', ')}` });
    if (!isValidRole(role)) return res.status(400).json({ error: 'Invalid role. Must be "driver" or "parent".' });
    if (!Expo.isExpoPushToken(expoPushToken)) return res.status(400).json({ error: 'Invalid Expo push token format' });

    try {
        const collection = role === ROLES.DRIVER ? COLLECTIONS.DRIVERS : COLLECTIONS.PARENTS;
        await db.collection(collection).doc(userId).set({ userId, expoPushToken, role, tokenUpdatedAt: new Date().toISOString() }, { merge: true });
        console.log(`Token registered for ${role}: ${userId}`);
        res.status(200).json({ success: true, message: `${capitalizeFirst(role)} token registered` });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to register token', details: error.message });
    }
};

const getUserInfo = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.query;
    if (!userId || !role) return res.status(400).json({ error: 'Missing userId or role' });
    if (!isValidRole(role)) return res.status(400).json({ error: 'Invalid role' });
    try {
        const collection = role === ROLES.DRIVER ? COLLECTIONS.DRIVERS : COLLECTIONS.PARENTS;
        const doc = await db.collection(collection).doc(userId).get();
        if (!doc.exists) return res.status(404).json({ error: 'User not found' });
        const userData = doc.data(); delete userData.expoPushToken;
        res.status(200).json({ success: true, user: userData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user', details: error.message });
    }
};

module.exports = { registerToken, getUserInfo };
=======
/**
 * Register Expo Push Token for parent or driver
 * POST /api/auth/register-token
 */
const registerToken = async (req, res) => {
    const { userId, role, expoPushToken } = req.body;

    console.log('Received token registration request:', { userId, role, expoPushToken });

    // Validate required fields
    const validation = validateRequiredFields(req.body, ['userId', 'role', 'expoPushToken']);
    if (!validation.isValid) {
        return res.status(400).json({
            error: `Missing required fields: ${validation.missingFields.join(', ')}`
        });
    }

    // Validate role
    if (!isValidRole(role)) {
        return res.status(400).json({
            error: `Invalid role. Must be "${ROLES.DRIVER}" or "${ROLES.PARENT}".`
        });
    }

    // Validate Expo Push Token format
    if (!Expo.isExpoPushToken(expoPushToken)) {
        console.error(`Invalid Expo push token received: ${expoPushToken}`);
        return res.status(400).json({ error: 'Invalid Expo push token format' });
    }

    try {
        // Determine collection based on role
        const collectionName = role === ROLES.DRIVER ? COLLECTIONS.DRIVERS : COLLECTIONS.PARENTS;

        const userRef = db.collection(collectionName).doc(userId);

        // Update user document with the new Expo Push Token
        await userRef.set({
            userId: userId,
            expoPushToken: expoPushToken,
            role: role,
            tokenUpdatedAt: new Date().toISOString(),
        }, { merge: true });

        console.log(`Expo Push Token registered successfully for ${role}: ${userId} in collection: ${collectionName}`);

        res.status(200).json({
            success: true,
            message: `${capitalizeFirst(role)} token registered successfully`
        });

    } catch (error) {
        console.error('Error registering Expo push token:', error);
        res.status(500).json({
            error: 'Failed to register Expo push token',
            details: error.message
        });
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
        const collectionName = role === ROLES.DRIVER ? COLLECTIONS.DRIVERS : COLLECTIONS.PARENTS;
        const userDoc = await db.collection(collectionName).doc(userId).get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Don't return sensitive data like tokens
        const userData = userDoc.data();
        delete userData.expoPushToken;

        res.status(200).json({ success: true, user: userData });

    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ error: 'Failed to fetch user info', details: error.message });
    }
};

module.exports = {
    registerToken,
    getUserInfo,
};
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
