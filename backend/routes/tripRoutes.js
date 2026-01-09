// routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const { handleStartTrip, handleEndTrip, getTripStatus, getDriverActiveTrip, handleUpdateStop } = require('../controllers/tripController');

router.post('/start', handleStartTrip);
router.post('/end', handleEndTrip);
router.get('/status/:tripId', getTripStatus);
router.get('/active/:driverId', getDriverActiveTrip);
router.post('/update-stop', handleUpdateStop);

module.exports = router;
