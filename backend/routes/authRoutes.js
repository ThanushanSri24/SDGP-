<<<<<<< HEAD
// routes/authRoutes.js
=======
// routes/authRoutes.js - Authentication and token registration routes
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
const express = require('express');
const router = express.Router();
const { registerToken, getUserInfo } = require('../controllers/authController');

<<<<<<< HEAD
router.post('/register-token', registerToken);
=======
// POST /api/auth/register-token - Register Expo Push Token
router.post('/register-token', registerToken);

// GET /api/auth/user/:userId - Get user info
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
router.get('/user/:userId', getUserInfo);

module.exports = router;
