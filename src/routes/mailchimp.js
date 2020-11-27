const express = require('express');
const router = express.Router();

// Controlador
const mailController = require('../controllers/mail');

// Obtiene todos los eventos de un calendario
router.get('/marketing/ping', mailController.ping);
router.get('/marketing/:listId/members', mailController.getMembers);

module.exports = router;
