// services/locationService.js - GPS tracking service
const { db } = require('../config/firebase');
const { COLLECTIONS } = require('../utils/constants');
const { calculateDistance } = require('../utils/helpers');

const DEFAULT_PROXIMITY_RADIUS_KM = 0.5;

const updateDriverLocation = async (driverId, location, tripId = null) => {
    const updateData = { currentLocation: { ...location, updatedAt: new Date().toISOString() } };
    if (tripId) updateData.activeTripId = tripId;
    await db.collection(COLLECTIONS.DRIVERS).doc(driverId).update(updateData);
    if (tripId) await db.collection(COLLECTIONS.TRIPS).doc(tripId).update({ lastLocation: updateData.currentLocation });
    return updateData.currentLocation;
};

const getDriverLocation = async (driverId) => {
    const doc = await db.collection(COLLECTIONS.DRIVERS).doc(driverId).get();
    return doc.exists ? doc.data().currentLocation || null : null;
};

const checkProximity = (driverLoc, targetLoc, radiusKm = DEFAULT_PROXIMITY_RADIUS_KM) => {
    const distanceKm = calculateDistance(driverLoc.latitude, driverLoc.longitude, targetLoc.latitude, targetLoc.longitude);
    return { isNear: distanceKm <= radiusKm, distanceKm: Math.round(distanceKm * 100) / 100 };
};

const estimateArrivalTime = (distanceKm, avgSpeedKmh = 30) => Math.ceil((distanceKm / avgSpeedKmh) * 60);

module.exports = { updateDriverLocation, getDriverLocation, checkProximity, estimateArrivalTime, DEFAULT_PROXIMITY_RADIUS_KM };
