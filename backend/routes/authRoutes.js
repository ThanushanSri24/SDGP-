// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerToken, getUserInfo, register, login } = require('../controllers/authController');

router.post('/register', (req, res, next) => {
    console.log('➡️ Route Hit: POST /api/auth/register');
    console.log('Body:', req.body);
    next();
}, register);
router.post('/login', login);
router.post('/register-token', registerToken);
router.get('/user/:userId', getUserInfo);

module.exports = router;
