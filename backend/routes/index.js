// routes/index.js - Route aggregator
const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes = require('./authRoutes');
const sosRoutes = require('./sosRoutes');
const tripRoutes = require('./tripRoutes');
const locationRoutes = require('./locationRoutes');
const absenceRoutes = require('./absenceRoutes');
const ratingRoutes = require('./ratingRoutes');
const healthRoutes = require('./healthRoutes');

// Mount routes
router.use('/auth', authRoutes);           // /api/auth/*
router.use('/sos', sosRoutes);             // /api/sos/*
router.use('/trips', tripRoutes);          // /api/trips/*
router.use('/location', locationRoutes);   // /api/location/*
router.use('/absence', absenceRoutes);     // /api/absence/*
router.use('/ratings', ratingRoutes);      // /api/ratings/*
router.use('/health', healthRoutes);       // /api/health

module.exports = router;
