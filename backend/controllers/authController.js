// controllers/authController.js - Token registration (supports both Expo and FCM)
const { db } = require('../config/firebase');
const { Expo } = require('../config/expo');
const { ROLES, COLLECTIONS } = require('../utils/constants');
const { validateRequiredFields, isValidRole } = require('../utils/validators');
const { capitalizeFirst } = require('../utils/helpers');

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

module.exports = { registerToken, getUserInfo };
