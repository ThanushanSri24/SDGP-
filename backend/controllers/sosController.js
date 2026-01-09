// controllers/sosController.js - Emergency alert logic
const { db, admin } = require('../config/firebase');
const { Expo } = require('../config/expo');
const { sendPushNotifications } = require('../services/notificationService');
const { COLLECTIONS, ALERT_STATUS } = require('../utils/constants');

const triggerSOS = async (req, res) => {
    const { driverId, message, location } = req.body;
    console.log('SOS request:', { driverId, message });
    if (!driverId) return res.status(400).json({ error: 'Missing driverId' });

    try {
        const driverDoc = await db.collection(COLLECTIONS.DRIVERS).doc(driverId).get();
        if (!driverDoc.exists) return res.status(404).json({ error: 'Driver not found' });

        const driverData = driverDoc.data();
        const parentIds = driverData.associatedParentIds || [];
        if (parentIds.length === 0) return res.status(404).json({ error: 'No parents associated' });

        const parentDocs = await Promise.all(parentIds.map(id => db.collection(COLLECTIONS.PARENTS).doc(id).get()));
        const tokens = parentDocs.filter(d => d.exists).map(d => d.data().expoPushToken).filter(t => t && Expo.isExpoPushToken(t));
        if (tokens.length === 0) return res.status(404).json({ error: 'No valid parent tokens' });

        const result = await sendPushNotifications(tokens, '🚨 EMERGENCY ALERT!', message || 'Driver triggered emergency.', { type: 'EMERGENCY', driverId, timestamp: new Date().toISOString(), location: location ? JSON.stringify(location) : null });

        const alertRef = db.collection(COLLECTIONS.EMERGENCY_ALERTS).doc();
        await alertRef.set({ alertId: alertRef.id, driverId, parentIds, message: message || 'Emergency', location: location || null, timestamp: admin.firestore.FieldValue.serverTimestamp(), status: result.errors === 0 ? ALERT_STATUS.SENT : result.success > 0 ? ALERT_STATUS.PARTIALLY_SENT : ALERT_STATUS.FAILED });

        res.status(200).json({ success: true, message: 'SOS alert sent', sentToCount: result.success, failedCount: result.errors, alertId: alertRef.id });
    } catch (error) {
        console.error('SOS error:', error);
        res.status(500).json({ error: 'Failed to process SOS', details: error.message });
    }
};

const getAlertHistory = async (req, res) => {
    const { driverId } = req.params;
    try {
        const snapshot = await db.collection(COLLECTIONS.EMERGENCY_ALERTS).where('driverId', '==', driverId).orderBy('timestamp', 'desc').limit(10).get();
        res.status(200).json({ success: true, alerts: snapshot.docs.map(d => d.data()) });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history', details: error.message });
    }
};

module.exports = { triggerSOS, getAlertHistory };
