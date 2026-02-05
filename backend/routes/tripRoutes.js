<<<<<<< HEAD
// routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const { handleStartTrip, handleEndTrip, getTripStatus, getDriverActiveTrip, handleUpdateStop } = require('../controllers/tripController');

router.post('/start', handleStartTrip);
router.post('/end', handleEndTrip);
router.get('/status/:tripId', getTripStatus);
router.get('/active/:driverId', getDriverActiveTrip);
=======
// routes/tripRoutes.js - Trip management routes
const express = require('express');
const router = express.Router();
const {
    handleStartTrip,
    handleEndTrip,
    getTripStatus,
    getDriverActiveTrip,
    handleUpdateStop
} = require('../controllers/tripController');

// POST /api/trips/start - Start a new trip
router.post('/start', handleStartTrip);

// POST /api/trips/end - End a trip
router.post('/end', handleEndTrip);

// GET /api/trips/status/:tripId - Get trip status
router.get('/status/:tripId', getTripStatus);

// GET /api/trips/active/:driverId - Get active trip for a driver
router.get('/active/:driverId', getDriverActiveTrip);

// POST /api/trips/update-stop - Update child pickup/dropoff status
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
router.post('/update-stop', handleUpdateStop);

module.exports = router;
