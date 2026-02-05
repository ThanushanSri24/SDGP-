// routes/index.js - Route aggregator
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const sosRoutes = require('./sosRoutes');
const tripRoutes = require('./tripRoutes');
const locationRoutes = require('./locationRoutes');
const absenceRoutes = require('./absenceRoutes');
const ratingRoutes = require('./ratingRoutes');
const healthRoutes = require('./healthRoutes');

router.use('/auth', authRoutes);
router.use('/sos', sosRoutes);
router.use('/trips', tripRoutes);
router.use('/location', locationRoutes);
router.use('/absence', absenceRoutes);
router.use('/ratings', ratingRoutes);
router.use('/health', healthRoutes);

module.exports = router;
