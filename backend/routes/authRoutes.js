// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerToken, getUserInfo } = require('../controllers/authController');

router.post('/register-token', registerToken);
router.get('/user/:userId', getUserInfo);

module.exports = router;
