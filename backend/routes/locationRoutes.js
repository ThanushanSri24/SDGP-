// routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const { handleLocationUpdate, getLocation, getVanLocationForParent } = require('../controllers/locationController');

router.post('/update', handleLocationUpdate);
router.get('/van/:childId', getVanLocationForParent);
router.get('/:driverId', getLocation);

module.exports = router;
