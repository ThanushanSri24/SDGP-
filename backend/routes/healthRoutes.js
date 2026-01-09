<<<<<<< HEAD
// routes/healthRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
=======
// routes/healthRoutes.js - Health check routes
const express = require('express');
const router = express.Router();

// GET /api/health - Health check endpoint
router.get('/', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
});

module.exports = router;
