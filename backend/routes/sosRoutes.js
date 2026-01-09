// routes/sosRoutes.js
const express = require('express');
const router = express.Router();
const { triggerSOS, getAlertHistory } = require('../controllers/sosController');

router.post('/trigger', triggerSOS);
router.get('/history/:driverId', getAlertHistory);

module.exports = router;
