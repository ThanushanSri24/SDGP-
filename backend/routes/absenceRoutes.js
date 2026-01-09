// routes/absenceRoutes.js
const express = require('express');
const router = express.Router();
const { markAbsence, confirmAbsence, cancelAbsence, getChildAbsences } = require('../controllers/absenceController');

router.post('/mark', markAbsence);
router.post('/confirm', confirmAbsence);
router.post('/cancel', cancelAbsence);
router.get('/child/:childId', getChildAbsences);

module.exports = router;
