// routes/index.js - Route aggregator
const express = require('express');
const router = express.Router();

<<<<<<< HEAD
=======
// Import all route modules
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
const authRoutes = require('./authRoutes');
const sosRoutes = require('./sosRoutes');
const tripRoutes = require('./tripRoutes');
const locationRoutes = require('./locationRoutes');
const absenceRoutes = require('./absenceRoutes');
const ratingRoutes = require('./ratingRoutes');
const healthRoutes = require('./healthRoutes');

<<<<<<< HEAD
router.use('/auth', authRoutes);
router.use('/sos', sosRoutes);
router.use('/trips', tripRoutes);
router.use('/location', locationRoutes);
router.use('/absence', absenceRoutes);
router.use('/ratings', ratingRoutes);
router.use('/health', healthRoutes);
=======
// Mount routes
router.use('/auth', authRoutes);           // /api/auth/*
router.use('/sos', sosRoutes);             // /api/sos/*
router.use('/trips', tripRoutes);          // /api/trips/*
router.use('/location', locationRoutes);   // /api/location/*
router.use('/absence', absenceRoutes);     // /api/absence/*
router.use('/ratings', ratingRoutes);      // /api/ratings/*
router.use('/health', healthRoutes);       // /api/health
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)

module.exports = router;
