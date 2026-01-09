// controllers/locationController.js - GPS and proximity tracking
const { db } = require('../config/firebase');
const { COLLECTIONS } = require('../utils/constants');
const { updateDriverLocation, getDriverLocation, checkProximity, estimateArrivalTime } = require('../services/locationService');
const { getActiveTrip } = require('../services/tripService');
const { sendProximityNotification } = require('../services/notificationService');
const { isValidLocation } = require('../utils/validators');
const { Expo } = require('../config/expo');

const notifiedStops = new Map();

const handleLocationUpdate = async (req, res) => {
    const { driverId, latitude, longitude } = req.body;
    if (!driverId || latitude === undefined || longitude === undefined) return res.status(400).json({ error: 'Missing fields' });
    if (!isValidLocation({ latitude, longitude })) return res.status(400).json({ error: 'Invalid coordinates' });

    try {
        const activeTrip = await getActiveTrip(driverId);
        const location = await updateDriverLocation(driverId, { latitude, longitude }, activeTrip?.tripId);
        res.status(200).json({ success: true, location, activeTripId: activeTrip?.tripId || null });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update location', details: error.message });
    }
};

const getLocation = async (req, res) => {
    const location = await getDriverLocation(req.params.driverId);
    if (!location) return res.status(404).json({ error: 'Location not found' });
    res.status(200).json({ success: true, location });
};

const getVanLocationForParent = async (req, res) => {
    const { childId } = req.params;
    const { parentId } = req.query;
    try {
        const childDoc = await db.collection(COLLECTIONS.CHILDREN).doc(childId).get();
        if (!childDoc.exists) return res.status(404).json({ error: 'Child not found' });
        const childData = childDoc.data();
        if (parentId && childData.parentId !== parentId) return res.status(403).json({ error: 'Access denied' });

        const activeTrip = await getActiveTrip(childData.driverId);
        if (!activeTrip) return res.status(200).json({ success: true, tripActive: false, message: 'No active trip' });

        const location = await getDriverLocation(childData.driverId);
        res.status(200).json({ success: true, tripActive: true, tripId: activeTrip.tripId, location });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch location', details: error.message });
    }
};

module.exports = { handleLocationUpdate, getLocation, getVanLocationForParent };
