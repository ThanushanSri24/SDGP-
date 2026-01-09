<<<<<<< HEAD
// controllers/tripController.js - Driver journey control
const { db } = require('../config/firebase');
const { COLLECTIONS } = require('../utils/constants');
const { createTrip, startTrip, endTrip, getActiveTrip, getTripById, updateStopStatus } = require('../services/tripService');
=======
// controllers/tripController.js - Driver journey control logic
const { db } = require('../config/firebase');
const { COLLECTIONS, TRIP_STATUS } = require('../utils/constants');
const {
    createTrip,
    startTrip,
    endTrip,
    getActiveTrip,
    getTripById,
    updateStopStatus
} = require('../services/tripService');
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
const { generateOptimizedRoute } = require('../services/routeOptimizer');
const { sendTripStatusNotification, sendChildStatusNotification } = require('../services/notificationService');
const { Expo } = require('../config/expo');

<<<<<<< HEAD
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
=======
/**
 * Start a new trip
 * POST /api/trips/start
 */
const handleStartTrip = async (req, res) => {
    const { driverId, vanId, tripType, startLocation } = req.body;

    if (!driverId) {
        return res.status(400).json({ error: 'Missing required field: driverId' });
    }

    try {
        // Check if driver already has an active trip
        const existingTrip = await getActiveTrip(driverId);
        if (existingTrip) {
            return res.status(400).json({
                error: 'Driver already has an active trip',
                tripId: existingTrip.tripId
            });
        }

        // Get driver data to find associated children/stops
        const driverDoc = await db.collection(COLLECTIONS.DRIVERS).doc(driverId).get();
        if (!driverDoc.exists) {
            return res.status(404).json({ error: 'Driver not found' });
        }

        const driverData = driverDoc.data();
        const allStops = driverData.stops || [];

        // Generate optimized route considering today's absences
        const driverLocation = startLocation || driverData.homeLocation || { latitude: 0, longitude: 0 };
        const optimizedResult = await generateOptimizedRoute(
            driverId,
            allStops,
            driverLocation,
            tripType || 'morning'
        );

        // Create the trip with optimized stops
        const trip = await createTrip(
            driverId,
            vanId || driverData.vanId,
            optimizedResult.optimizedStops,
            tripType || 'morning'
        );

        // Start the trip
        const startedTrip = await startTrip(trip.tripId, startLocation);

        // Update driver's active trip
        await db.collection(COLLECTIONS.DRIVERS).doc(driverId).update({
            activeTripId: trip.tripId,
        });

        // Notify associated parents that trip has started
        const parentIds = driverData.associatedParentIds || [];
        if (parentIds.length > 0) {
            const parentDocs = await Promise.all(
                parentIds.map(id => db.collection(COLLECTIONS.PARENTS).doc(id).get())
            );
            const parentTokens = parentDocs
                .filter(doc => doc.exists)
                .map(doc => doc.data().expoPushToken)
                .filter(token => token && Expo.isExpoPushToken(token));

            if (parentTokens.length > 0) {
                await sendTripStatusNotification(parentTokens, 'started', driverData.name || 'Driver');
            }
        }

        console.log(`Trip started: ${trip.tripId} for driver: ${driverId}`);

        res.status(200).json({
            success: true,
            message: 'Trip started successfully',
            trip: startedTrip,
            optimizationInfo: {
                totalStops: optimizedResult.optimizedStops.length,
                removedAbsentStops: optimizedResult.removedStops.length,
                estimatedDistance: optimizedResult.totalDistanceKm,
            },
        });

    } catch (error) {
        console.error('Error starting trip:', error);
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
        res.status(500).json({ error: 'Failed to start trip', details: error.message });
    }
};

<<<<<<< HEAD
const handleEndTrip = async (req, res) => {
    const { driverId, tripId } = req.body;
    try {
        const trip = tripId ? await getTripById(tripId) : await getActiveTrip(driverId);
        if (!trip) return res.status(404).json({ error: 'No active trip' });
        await endTrip(trip.tripId);
        res.status(200).json({ success: true, message: 'Trip ended', tripId: trip.tripId });
    } catch (error) {
=======
/**
 * End a trip
 * POST /api/trips/end
 */
const handleEndTrip = async (req, res) => {
    const { driverId, tripId } = req.body;

    if (!driverId && !tripId) {
        return res.status(400).json({ error: 'Missing required field: driverId or tripId' });
    }

    try {
        let activeTrip;

        if (tripId) {
            activeTrip = await getTripById(tripId);
        } else {
            activeTrip = await getActiveTrip(driverId);
        }

        if (!activeTrip) {
            return res.status(404).json({ error: 'No active trip found' });
        }

        // End the trip
        const endedTrip = await endTrip(activeTrip.tripId);

        // Notify parents that trip has ended
        const driverDoc = await db.collection(COLLECTIONS.DRIVERS).doc(activeTrip.driverId).get();
        if (driverDoc.exists) {
            const driverData = driverDoc.data();
            const parentIds = driverData.associatedParentIds || [];

            if (parentIds.length > 0) {
                const parentDocs = await Promise.all(
                    parentIds.map(id => db.collection(COLLECTIONS.PARENTS).doc(id).get())
                );
                const parentTokens = parentDocs
                    .filter(doc => doc.exists)
                    .map(doc => doc.data().expoPushToken)
                    .filter(token => token && Expo.isExpoPushToken(token));

                if (parentTokens.length > 0) {
                    await sendTripStatusNotification(parentTokens, 'ended', driverData.name || 'Driver');
                }
            }
        }

        console.log(`Trip ended: ${activeTrip.tripId}`);

        res.status(200).json({
            success: true,
            message: 'Trip ended successfully',
            tripId: activeTrip.tripId,
        });

    } catch (error) {
        console.error('Error ending trip:', error);
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
        res.status(500).json({ error: 'Failed to end trip', details: error.message });
    }
};

<<<<<<< HEAD
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
=======
/**
 * Get trip status
 * GET /api/trips/status/:tripId
 */
const getTripStatus = async (req, res) => {
    const { tripId } = req.params;

    if (!tripId) {
        return res.status(400).json({ error: 'Missing tripId' });
    }

    try {
        const trip = await getTripById(tripId);

        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        res.status(200).json({ success: true, trip });

    } catch (error) {
        console.error('Error fetching trip status:', error);
        res.status(500).json({ error: 'Failed to fetch trip status', details: error.message });
    }
};

/**
 * Get active trip for a driver
 * GET /api/trips/active/:driverId
 */
const getDriverActiveTrip = async (req, res) => {
    const { driverId } = req.params;

    if (!driverId) {
        return res.status(400).json({ error: 'Missing driverId' });
    }

    try {
        const trip = await getActiveTrip(driverId);

        if (!trip) {
            return res.status(200).json({ success: true, active: false, trip: null });
        }

        res.status(200).json({ success: true, active: true, trip });

    } catch (error) {
        console.error('Error fetching active trip:', error);
        res.status(500).json({ error: 'Failed to fetch active trip', details: error.message });
    }
};

/**
 * Update child pickup/dropoff status
 * POST /api/trips/update-stop
 */
const handleUpdateStop = async (req, res) => {
    const { tripId, stopIndex, status, childId } = req.body;

    if (!tripId || stopIndex === undefined || !status) {
        return res.status(400).json({ error: 'Missing required fields: tripId, stopIndex, status' });
    }

    try {
        const updatedStop = await updateStopStatus(tripId, stopIndex, status);

        // If child was picked or dropped, notify parent
        if (childId && (status === 'picked' || status === 'dropped')) {
            // Get child's parent token
            const childDoc = await db.collection(COLLECTIONS.CHILDREN).doc(childId).get();
            if (childDoc.exists) {
                const childData = childDoc.data();
                const parentDoc = await db.collection(COLLECTIONS.PARENTS).doc(childData.parentId).get();

                if (parentDoc.exists) {
                    const parentData = parentDoc.data();
                    if (parentData.expoPushToken && Expo.isExpoPushToken(parentData.expoPushToken)) {
                        await sendChildStatusNotification(
                            parentData.expoPushToken,
                            childData.name || 'Your child',
                            status === 'picked' ? 'picked' : 'dropped'
                        );
                    }
                }
            }
        }

        res.status(200).json({
            success: true,
            message: `Stop status updated to: ${status}`,
            stop: updatedStop,
        });

    } catch (error) {
        console.error('Error updating stop:', error);
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
        res.status(500).json({ error: 'Failed to update stop', details: error.message });
    }
};

<<<<<<< HEAD
module.exports = { handleStartTrip, handleEndTrip, getTripStatus, getDriverActiveTrip, handleUpdateStop };
=======
module.exports = {
    handleStartTrip,
    handleEndTrip,
    getTripStatus,
    getDriverActiveTrip,
    handleUpdateStop,
};
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
