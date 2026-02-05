const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token
 */
const verifyToken = (req, res, next) => {
    // Get token from header
    const authHeader = req.headers['authorization'];

    // Check if token exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const token = authHeader.split(' ')[1];

        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_do_not_use_in_production');

        // Attach user to request
        req.user = verified;
        next();

    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;
