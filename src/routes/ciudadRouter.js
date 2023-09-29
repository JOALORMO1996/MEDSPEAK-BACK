const express = require('express');
const router = express.Router();
const checkauth = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {getCiudadesPorDepartamento} = require('../controllers/ciudad.controller');



router.get('/ciudades/:departamentoId', checkauth, roleMiddleware([1, 4]), getCiudadesPorDepartamento);

module.exports = router;