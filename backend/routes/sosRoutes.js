<<<<<<< HEAD
// routes/sosRoutes.js
=======
// routes/sosRoutes.js - Emergency alert routes
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
const express = require('express');
const router = express.Router();
const { triggerSOS, getAlertHistory } = require('../controllers/sosController');

<<<<<<< HEAD
router.post('/trigger', triggerSOS);
=======
// POST /api/sos/trigger - Trigger SOS emergency alert
router.post('/trigger', triggerSOS);

// GET /api/sos/history/:driverId - Get emergency alert history
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
router.get('/history/:driverId', getAlertHistory);

module.exports = router;
