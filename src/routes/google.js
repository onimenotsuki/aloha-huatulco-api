const express = require('express');
const router = express.Router();

// Controlador
const googleController = require('../controllers/google');

// Obtiene los datos de mi calendario
// Obtiene el calendario por default
router.get('/calendars/me', googleController.getMyCalendar);

// Crea un nuevo evento en el calendario
router.post('/calendars/me/events', googleController.createEvent);

// Obtiene todos los eventos de un calendario
router.get('/calendars/me/events', googleController.getEvents);

module.exports = router;
