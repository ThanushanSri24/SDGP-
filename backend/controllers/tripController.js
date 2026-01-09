// controllers/tripController.js - Driver journey control
const { db } = require('../config/firebase');
const { COLLECTIONS } = require('../utils/constants');
const { createTrip, startTrip, endTrip, getActiveTrip, getTripById, updateStopStatus } = require('../services/tripService');
const { generateOptimizedRoute } = require('../services/routeOptimizer');
const { sendTripStatusNotification, sendChildStatusNotification } = require('../services/notificationService');
const { Expo } = require('../config/expo');

const handleStartTrip = async (req, res) => {
    const { driverId, vanId, tripType, startLocation } = req.body;
    if (!driverId) return res.status(400).json({ error: 'Missing driverId' });

    try {
        const existingTrip = await getActiveTrip(driverId);
        if (existingTrip) return res.status(400).json({ error: 'Already has active trip', tripId: existingTrip.tripId });

        const driverDoc = await db.collection(COLLECTIONS.DRIVERS).doc(driverId).get();
        if (!driverDoc.exists) return res.status(404).json({ error: 'Driver not found' });
        const driverData = driverDoc.data();

        const optimized = await generateOptimizedRoute(driverId, driverData.stops || [], startLocation || { latitude: 0, longitude: 0 }, tripType || 'morning');
        const trip = await createTrip(driverId, vanId || driverData.vanId, optimized.optimizedStops, tripType || 'morning');
        const startedTrip = await startTrip(trip.tripId, startLocation);
        await db.collection(COLLECTIONS.DRIVERS).doc(driverId).update({ activeTripId: trip.tripId });

        const parentIds = driverData.associatedParentIds || [];
        if (parentIds.length > 0) {
            const parentDocs = await Promise.all(parentIds.map(id => db.collection(COLLECTIONS.PARENTS).doc(id).get()));
            const tokens = parentDocs.filter(d => d.exists).map(d => d.data().expoPushToken).filter(t => t && Expo.isExpoPushToken(t));
            if (tokens.length > 0) await sendTripStatusNotification(tokens, 'started', driverData.name || 'Driver');
        }

        res.status(200).json({ success: true, trip: startedTrip, optimization: { totalStops: optimized.optimizedStops.length, removedAbsent: optimized.removedStops.length } });
    } catch (error) {
        res.status(500).json({ error: 'Failed to start trip', details: error.message });
    }
};

const handleEndTrip = async (req, res) => {
    const { driverId, tripId } = req.body;
    try {
        const trip = tripId ? await getTripById(tripId) : await getActiveTrip(driverId);
        if (!trip) return res.status(404).json({ error: 'No active trip' });
        await endTrip(trip.tripId);
        res.status(200).json({ success: true, message: 'Trip ended', tripId: trip.tripId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to end trip', details: error.message });
    }
};

const getTripStatus = async (req, res) => {
    const trip = await getTripById(req.params.tripId);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.status(200).json({ success: true, trip });
};

const getDriverActiveTrip = async (req, res) => {
    const trip = await getActiveTrip(req.params.driverId);
    res.status(200).json({ success: true, active: !!trip, trip });
};

const handleUpdateStop = async (req, res) => {
    const { tripId, stopIndex, status, childId } = req.body;
    if (!tripId || stopIndex === undefined || !status) return res.status(400).json({ error: 'Missing fields' });
    try {
        const updated = await updateStopStatus(tripId, stopIndex, status);
        if (childId && (status === 'picked' || status === 'dropped')) {
            const childDoc = await db.collection(COLLECTIONS.CHILDREN).doc(childId).get();
            if (childDoc.exists) {
                const parentDoc = await db.collection(COLLECTIONS.PARENTS).doc(childDoc.data().parentId).get();
                if (parentDoc.exists && parentDoc.data().expoPushToken) {
                    await sendChildStatusNotification(parentDoc.data().expoPushToken, childDoc.data().name || 'Child', status === 'picked' ? 'picked' : 'dropped');
                }
            }
        }
        res.status(200).json({ success: true, stop: updated });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update stop', details: error.message });
    }
};

module.exports = { handleStartTrip, handleEndTrip, getTripStatus, getDriverActiveTrip, handleUpdateStop };
