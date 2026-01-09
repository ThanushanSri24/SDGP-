// routes/ratingRoutes.js
const express = require('express');
const router = express.Router();
const { submitRating, getDriverRatings, getVansOnRoute, canRateDriver } = require('../controllers/ratingController');

router.post('/submit', submitRating);
router.get('/driver/:driverId', getDriverRatings);
router.get('/vans', getVansOnRoute);
router.get('/can-rate', canRateDriver);

module.exports = router;
