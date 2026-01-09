// controllers/absenceController.js - Absence management
const { db, admin } = require('../config/firebase');
const { COLLECTIONS, ABSENCE_TYPES } = require('../utils/constants');
const { validateRequiredFields } = require('../utils/validators');

const markAbsence = async (req, res) => {
    const { parentId, childId, driverId, date, absenceType } = req.body;
    const validation = validateRequiredFields(req.body, ['parentId', 'childId', 'date', 'absenceType']);
    if (!validation.isValid) return res.status(400).json({ error: `Missing: ${validation.missingFields.join(', ')}` });
    if (!Object.values(ABSENCE_TYPES).includes(absenceType)) return res.status(400).json({ error: 'Invalid absenceType' });

    try {
        const childDoc = await db.collection(COLLECTIONS.CHILDREN).doc(childId).get();
        if (!childDoc.exists) return res.status(404).json({ error: 'Child not found' });
        if (childDoc.data().parentId !== parentId) return res.status(403).json({ error: 'Access denied' });

        const absenceRef = db.collection(COLLECTIONS.ABSENCES).doc();
        const absenceDate = new Date(date); absenceDate.setHours(0, 0, 0, 0);
        const absenceData = { absenceId: absenceRef.id, parentId, childId, childName: childDoc.data().name, driverId: driverId || childDoc.data().driverId, date: absenceDate, absenceType, status: 'pending', createdAt: admin.firestore.FieldValue.serverTimestamp() };
        await absenceRef.set(absenceData);
        res.status(200).json({ success: true, message: 'Absence marked. Please confirm.', absenceId: absenceRef.id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark absence', details: error.message });
    }
};

const confirmAbsence = async (req, res) => {
    const { absenceId, parentId } = req.body;
    if (!absenceId || !parentId) return res.status(400).json({ error: 'Missing absenceId or parentId' });
    try {
        const absenceRef = db.collection(COLLECTIONS.ABSENCES).doc(absenceId);
        const doc = await absenceRef.get();
        if (!doc.exists) return res.status(404).json({ error: 'Absence not found' });
        if (doc.data().parentId !== parentId) return res.status(403).json({ error: 'Access denied' });
        if (doc.data().status === 'confirmed') return res.status(400).json({ error: 'Already confirmed' });
        await absenceRef.update({ status: 'confirmed', confirmedAt: admin.firestore.FieldValue.serverTimestamp() });
        res.status(200).json({ success: true, message: 'Absence confirmed. Route will be optimized.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to confirm', details: error.message });
    }
};

const cancelAbsence = async (req, res) => {
    const { absenceId, parentId } = req.body;
    try {
        const absenceRef = db.collection(COLLECTIONS.ABSENCES).doc(absenceId);
        const doc = await absenceRef.get();
        if (!doc.exists) return res.status(404).json({ error: 'Not found' });
        if (doc.data().parentId !== parentId) return res.status(403).json({ error: 'Access denied' });
        await absenceRef.update({ status: 'cancelled', cancelledAt: admin.firestore.FieldValue.serverTimestamp() });
        res.status(200).json({ success: true, message: 'Absence cancelled' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to cancel', details: error.message });
    }
};

const getChildAbsences = async (req, res) => {
    const { childId } = req.params;
    try {
        const snapshot = await db.collection(COLLECTIONS.ABSENCES).where('childId', '==', childId).orderBy('date', 'desc').get();
        res.status(200).json({ success: true, absences: snapshot.docs.map(d => d.data()) });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch', details: error.message });
    }
};

module.exports = { markAbsence, confirmAbsence, cancelAbsence, getChildAbsences };
