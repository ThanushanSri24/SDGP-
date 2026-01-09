// services/routeOptimizer.js - Route optimization for absences
const { db } = require('../config/firebase');
const { COLLECTIONS } = require('../utils/constants');
const { calculateDistance } = require('../utils/helpers');

const removeAbsentStops = (stops, absentChildIds) => stops.filter(s => !absentChildIds.includes(s.childId));

const optimizeStopOrder = (stops, startLocation) => {
    if (stops.length <= 1) return stops;
    const optimized = [];
    const remaining = [...stops];
    let currentLocation = startLocation;
    while (remaining.length > 0) {
        let nearestIndex = 0, nearestDistance = Infinity;
        for (let i = 0; i < remaining.length; i++) {
            const dist = calculateDistance(currentLocation.latitude, currentLocation.longitude, remaining[i].location.latitude, remaining[i].location.longitude);
            if (dist < nearestDistance) { nearestDistance = dist; nearestIndex = i; }
        }
        const nearest = remaining.splice(nearestIndex, 1)[0];
        optimized.push(nearest);
        currentLocation = nearest.location;
    }
    return optimized.map((s, i) => ({ ...s, order: i }));
};

const getTodaysAbsences = async (driverId, tripType) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
    const snapshot = await db.collection(COLLECTIONS.ABSENCES).where('driverId', '==', driverId).where('date', '>=', today).where('date', '<', tomorrow).get();
    const absentIds = [];
    snapshot.forEach(doc => {
        const a = doc.data();
        if (a.absenceType === 'full_day' || (a.absenceType === 'morning_only' && tripType === 'morning') || (a.absenceType === 'evening_only' && tripType === 'evening')) {
            absentIds.push(a.childId);
        }
    });
    return absentIds;
};

const generateOptimizedRoute = async (driverId, allStops, startLocation, tripType) => {
    const absentChildIds = await getTodaysAbsences(driverId, tripType);
    const removedStops = allStops.filter(s => absentChildIds.includes(s.childId));
    const activeStops = removeAbsentStops(allStops, absentChildIds);
    const optimizedStops = optimizeStopOrder(activeStops, startLocation);
    let totalDistance = 0, prevLocation = startLocation;
    for (const stop of optimizedStops) {
        totalDistance += calculateDistance(prevLocation.latitude, prevLocation.longitude, stop.location.latitude, stop.location.longitude);
        prevLocation = stop.location;
    }
    return { optimizedStops, removedStops, absentChildIds, totalDistanceKm: Math.round(totalDistance * 100) / 100 };
};

module.exports = { removeAbsentStops, optimizeStopOrder, getTodaysAbsences, generateOptimizedRoute };
