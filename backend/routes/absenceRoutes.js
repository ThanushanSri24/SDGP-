<<<<<<< HEAD
// routes/absenceRoutes.js
const express = require('express');
const router = express.Router();
const { markAbsence, confirmAbsence, cancelAbsence, getChildAbsences } = require('../controllers/absenceController');

router.post('/mark', markAbsence);
router.post('/confirm', confirmAbsence);
router.post('/cancel', cancelAbsence);
=======
// routes/absenceRoutes.js - Absence management routes
const express = require('express');
const router = express.Router();
const {
    markAbsence,
    confirmAbsence,
    cancelAbsence,
    getChildAbsences
} = require('../controllers/absenceController');

// POST /api/absence/mark - Mark child as absent
router.post('/mark', markAbsence);

// POST /api/absence/confirm - Confirm absence (double-check)
router.post('/confirm', confirmAbsence);

// POST /api/absence/cancel - Cancel absence
router.post('/cancel', cancelAbsence);

// GET /api/absence/child/:childId - Get absences for a child
>>>>>>> e086e83 (refactor: modularize backend into config, controllers, services, routes, middleware, and utils)
router.get('/child/:childId', getChildAbsences);

module.exports = router;
