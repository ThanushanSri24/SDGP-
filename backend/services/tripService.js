// services/tripService.js - Trip management
const { db, admin } = require('../config/firebase');
const { COLLECTIONS, TRIP_STATUS } = require('../utils/constants');

const createTrip = async (driverId, vanId, stops, tripType = 'morning') => {
    const tripRef = db.collection(COLLECTIONS.TRIPS).doc();
    const tripData = {
        tripId: tripRef.id, driverId, vanId, tripType, status: TRIP_STATUS.NOT_STARTED,
        stops: stops.map((s, i) => ({ ...s, order: i, status: 'pending' })),
        createdAt: admin.firestore.FieldValue.serverTimestamp(), startedAt: null, endedAt: null
    };
    await tripRef.set(tripData);
    return tripData;
};

const startTrip = async (tripId, startLocation = null) => {
    const tripRef = db.collection(COLLECTIONS.TRIPS).doc(tripId);
    const updateData = { status: TRIP_STATUS.IN_PROGRESS, startedAt: admin.firestore.FieldValue.serverTimestamp() };
    if (startLocation) updateData.lastLocation = { ...startLocation, updatedAt: new Date().toISOString() };
    await tripRef.update(updateData);
    return (await tripRef.get()).data();
};

const endTrip = async (tripId) => {
    const tripRef = db.collection(COLLECTIONS.TRIPS).doc(tripId);
    await tripRef.update({ status: TRIP_STATUS.COMPLETED, endedAt: admin.firestore.FieldValue.serverTimestamp() });
    const tripData = (await tripRef.get()).data();
    await db.collection(COLLECTIONS.DRIVERS).doc(tripData.driverId).update({ activeTripId: null });
    return tripData;
};

const getActiveTrip = async (driverId) => {
    const snapshot = await db.collection(COLLECTIONS.TRIPS).where('driverId', '==', driverId).where('status', '==', TRIP_STATUS.IN_PROGRESS).limit(1).get();
    return snapshot.empty ? null : snapshot.docs[0].data();
};

const getTripById = async (tripId) => {
    const doc = await db.collection(COLLECTIONS.TRIPS).doc(tripId).get();
    return doc.exists ? doc.data() : null;
};

const updateStopStatus = async (tripId, stopIndex, status) => {
    const tripRef = db.collection(COLLECTIONS.TRIPS).doc(tripId);
    const tripDoc = await tripRef.get();
    if (!tripDoc.exists) throw new Error('Trip not found');
    const stops = tripDoc.data().stops;
    stops[stopIndex].status = status;
    stops[stopIndex].updatedAt = new Date().toISOString();
    await tripRef.update({ stops });
    return stops[stopIndex];
};

module.exports = { createTrip, startTrip, endTrip, getActiveTrip, getTripById, updateStopStatus };
