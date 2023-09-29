const express = require('express');
const router = express.Router();
const checkauth = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {getDepartamento} = require('../controllers/departamento.controller');



router.get('/departamentos', checkauth, roleMiddleware([1, 4]), getDepartamento);

module.exports = router;