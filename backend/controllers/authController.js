// controllers/authController.js - Token registration logic
const { db } = require('../config/firebase');
const { Expo } = require('../config/expo');
const { ROLES, COLLECTIONS } = require('../utils/constants');
const { validateRequiredFields, isValidRole } = require('../utils/validators');
const { capitalizeFirst } = require('../utils/helpers');

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
