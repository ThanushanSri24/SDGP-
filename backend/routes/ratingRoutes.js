// routes/ratingRoutes.js - Driver rating and van selection routes
const express = require('express');
const router = express.Router();
const {
    submitRating,
    getDriverRatings,
    getVansOnRoute,
    canRateDriver
} = require('../controllers/ratingController');

// POST /api/ratings/submit - Submit driver rating
router.post('/submit', submitRating);

// GET /api/ratings/driver/:driverId - Get driver's ratings
router.get('/driver/:driverId', getDriverRatings);

// GET /api/ratings/vans - Get available vans on a route with ratings
router.get('/vans', getVansOnRoute);

// GET /api/ratings/can-rate - Check if parent can rate a driver

router.get('/can-rate', canRateDriver);

module.exports = router;
