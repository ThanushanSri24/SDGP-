// controllers/sosController.js - Emergency alert logic with FCM
const { db, admin } = require('../config/firebase');
const { sendSOSNotification } = require('../services/fcmService');
const { COLLECTIONS, ALERT_STATUS } = require('../utils/constants');

/**
 * Trigger SOS Emergency Alert via FCM
 * POST /api/sos/trigger
 */
const triggerSOS = async (req, res) => {
    const { driverId, message, location } = req.body;
    console.log('🚨 SOS Request received:', { driverId, message, location });

    if (!driverId) {
        return res.status(400).json({ error: 'Missing required field: driverId' });
    }

    try {
        // 1. Fetch driver document
        const driverDoc = await db.collection(COLLECTIONS.DRIVERS).doc(driverId).get();
        if (!driverDoc.exists) {
            console.error(`Driver not found: ${driverId}`);
            return res.status(404).json({ error: 'Driver not found' });
        }

        const driverData = driverDoc.data();
        const driverName = driverData.name || 'Driver';
        console.log(`Driver found: ${driverName}`);

        // 2. Get associated parent IDs
        const parentIds = driverData.associatedParentIds || [];
        if (parentIds.length === 0) {
            console.warn(`No parents associated with driver: ${driverId}`);
            return res.status(404).json({ error: 'No parents associated with this driver' });
        }
        console.log(`Found ${parentIds.length} associated parents`);

        // 3. Fetch FCM tokens for all parents
        const parentDocs = await Promise.all(
            parentIds.map(id => db.collection(COLLECTIONS.PARENTS).doc(id).get())
        );

        const fcmTokens = parentDocs
            .filter(doc => doc.exists)
            .map(doc => doc.data().fcmToken)
            .filter(token => token && typeof token === 'string');

        console.log(`Found ${fcmTokens.length} valid FCM tokens`);

        if (fcmTokens.length === 0) {
            console.warn('No valid FCM tokens found for parents');
            return res.status(404).json({ error: 'No valid FCM tokens found for parents' });
        }

        // 4. Send FCM notifications
        const result = await sendSOSNotification(
            fcmTokens,
            driverId,
            driverName,
            message || `${driverName} has triggered an emergency alert!`,
            location
        );

        console.log(`FCM Result: ${result.success} sent, ${result.failures} failed`);

        // 5. Determine alert status
        let alertStatus;
        if (result.failures === 0) {
            alertStatus = ALERT_STATUS.SENT;
        } else if (result.success > 0) {
            alertStatus = ALERT_STATUS.PARTIALLY_SENT;
        } else {
            alertStatus = ALERT_STATUS.FAILED;
        }

        // 6. Log emergency alert to Firestore
        const alertRef = db.collection(COLLECTIONS.EMERGENCY_ALERTS).doc();
        await alertRef.set({
            alertId: alertRef.id,
            driverId: driverId,
            driverName: driverName,
            parentIds: parentIds,
            message: message || 'Emergency triggered by driver.',
            location: location || null,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            status: alertStatus,
            notificationsSent: result.success,
            notificationsFailed: result.failures,
        });

        console.log(`✅ Emergency alert logged: ${alertRef.id}`);

        res.status(200).json({
            success: true,
            message: 'SOS alert sent successfully',
            alertId: alertRef.id,
            sentToCount: result.success,
            failedCount: result.failures,
            status: alertStatus,
        });

    } catch (error) {
        console.error('❌ SOS Error:', error);
        res.status(500).json({
            error: 'Failed to send SOS alert',
            details: error.message
        });
    }
};

/**
 * Get emergency alerts history for a driver
 * GET /api/sos/history/:driverId
 */
const getAlertHistory = async (req, res) => {
    const { driverId } = req.params;
    const { limit = 20 } = req.query;

    if (!driverId) {
        return res.status(400).json({ error: 'Missing driverId' });
    }

    try {
        const alertsSnapshot = await db.collection(COLLECTIONS.EMERGENCY_ALERTS)
            .where('driverId', '==', driverId)
            .orderBy('timestamp', 'desc')
            .limit(parseInt(limit))
            .get();

        const alerts = alertsSnapshot.docs.map(doc => ({
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate?.() || null,
        }));

        res.status(200).json({
            success: true,
            count: alerts.length,
            alerts
        });

    } catch (error) {
        console.error('Error fetching alert history:', error);
        res.status(500).json({ error: 'Failed to fetch alert history', details: error.message });
    }
};

/**
 * Get active/recent alerts for parents
 * GET /api/sos/active/:parentId
 */
const getActiveAlertsForParent = async (req, res) => {
    const { parentId } = req.params;

    if (!parentId) {
        return res.status(400).json({ error: 'Missing parentId' });
    }

    try {
        // Get alerts from last 24 hours that include this parent
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const alertsSnapshot = await db.collection(COLLECTIONS.EMERGENCY_ALERTS)
            .where('parentIds', 'array-contains', parentId)
            .where('timestamp', '>=', twentyFourHoursAgo)
            .orderBy('timestamp', 'desc')
            .limit(10)
            .get();

        const alerts = alertsSnapshot.docs.map(doc => ({
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate?.() || null,
        }));

        res.status(200).json({
            success: true,
            count: alerts.length,
            alerts
        });

    } catch (error) {
        console.error('Error fetching active alerts:', error);
        res.status(500).json({ error: 'Failed to fetch alerts', details: error.message });
    }
};

module.exports = {
    triggerSOS,
    getAlertHistory,
    getActiveAlertsForParent,
};
