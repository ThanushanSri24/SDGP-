// controllers/ratingController.js - Driver ratings and van selection
const { db, admin } = require('../config/firebase');
const { COLLECTIONS } = require('../utils/constants');
const { validateRequiredFields } = require('../utils/validators');

const RATING_COOLDOWN_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

const submitRating = async (req, res) => {
    const { parentId, driverId, safety, punctuality, service, comment } = req.body;
    const validation = validateRequiredFields(req.body, ['parentId', 'driverId', 'safety', 'punctuality', 'service']);
    if (!validation.isValid) return res.status(400).json({ error: `Missing: ${validation.missingFields.join(', ')}` });
    if ([safety, punctuality, service].some(r => typeof r !== 'number' || r < 1 || r > 5)) return res.status(400).json({ error: 'Ratings must be 1-5' });

    try {
        const recent = await db.collection(COLLECTIONS.RATINGS).where('parentId', '==', parentId).where('driverId', '==', driverId).orderBy('createdAt', 'desc').limit(1).get();
        if (!recent.empty) {
            const last = recent.docs[0].data().createdAt?.toDate() || new Date(0);
            if (Date.now() - last.getTime() < RATING_COOLDOWN_MS) {
                return res.status(400).json({ error: 'Can only rate every 3 months' });
            }
        }
        const overall = (safety + punctuality + service) / 3;
        const ratingRef = db.collection(COLLECTIONS.RATINGS).doc();
        await ratingRef.set({ ratingId: ratingRef.id, parentId, driverId, safety, punctuality, service, overall: Math.round(overall * 10) / 10, comment: comment || null, createdAt: admin.firestore.FieldValue.serverTimestamp() });

        // Update driver average
        const allRatings = await db.collection(COLLECTIONS.RATINGS).where('driverId', '==', driverId).get();
        let totalOverall = 0;
        allRatings.forEach(d => totalOverall += d.data().overall || 0);
        const avgOverall = Math.round((totalOverall / allRatings.size) * 10) / 10;
        await db.collection(COLLECTIONS.DRIVERS).doc(driverId).update({ averageRating: { overall: avgOverall, totalRatings: allRatings.size } });

        res.status(200).json({ success: true, message: 'Rating submitted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit rating', details: error.message });
    }
};

const getDriverRatings = async (req, res) => {
    const { driverId } = req.params;
    try {
        const driverDoc = await db.collection(COLLECTIONS.DRIVERS).doc(driverId).get();
        if (!driverDoc.exists) return res.status(404).json({ error: 'Driver not found' });
        const snapshot = await db.collection(COLLECTIONS.RATINGS).where('driverId', '==', driverId).orderBy('createdAt', 'desc').limit(10).get();
        res.status(200).json({ success: true, driverName: driverDoc.data().name, averageRating: driverDoc.data().averageRating, ratings: snapshot.docs.map(d => { const data = d.data(); delete data.parentId; return data; }) });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ratings', details: error.message });
    }
};

const getVansOnRoute = async (req, res) => {
    try {
        const snapshot = await db.collection(COLLECTIONS.DRIVERS).get();
        const vans = snapshot.docs.map(d => ({ driverId: d.id, driverName: d.data().name, averageRating: d.data().averageRating, vanInfo: d.data().vanInfo })).sort((a, b) => (b.averageRating?.overall || 0) - (a.averageRating?.overall || 0));
        res.status(200).json({ success: true, vans });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch vans', details: error.message });
    }
};

const canRateDriver = async (req, res) => {
    const { parentId, driverId } = req.query;
    try {
        const recent = await db.collection(COLLECTIONS.RATINGS).where('parentId', '==', parentId).where('driverId', '==', driverId).orderBy('createdAt', 'desc').limit(1).get();
        if (recent.empty) return res.status(200).json({ canRate: true });
        const last = recent.docs[0].data().createdAt?.toDate() || new Date(0);
        const canRate = Date.now() - last.getTime() >= RATING_COOLDOWN_MS;
        const daysRemaining = canRate ? 0 : Math.ceil((RATING_COOLDOWN_MS - (Date.now() - last.getTime())) / (24 * 60 * 60 * 1000));
        res.status(200).json({ canRate, daysRemaining });
    } catch (error) {
        res.status(500).json({ error: 'Failed to check', details: error.message });
    }
};

module.exports = { submitRating, getDriverRatings, getVansOnRoute, canRateDriver };
