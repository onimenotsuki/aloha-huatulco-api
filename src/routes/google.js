const express = require('express');
const router = express.Router();

const googleController = require('../controllers/google');

// Obtiene los datos de mi calendario
router.get('/calendar/me', googleController.getMyCalendar);

module.exports = router;
