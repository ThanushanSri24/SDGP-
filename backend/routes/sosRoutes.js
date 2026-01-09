// routes/sosRoutes.js - Emergency alert routes
const express = require('express');
const router = express.Router();
const { triggerSOS, getAlertHistory, getActiveAlertsForParent } = require('../controllers/sosController');

// POST /api/sos/trigger - Trigger SOS emergency alert
router.post('/trigger', triggerSOS);

// GET /api/sos/history/:driverId - Get emergency alert history for driver
router.get('/history/:driverId', getAlertHistory);

// GET /api/sos/active/:parentId - Get active alerts for a parent
router.get('/active/:parentId', getActiveAlertsForParent);

module.exports = router;
