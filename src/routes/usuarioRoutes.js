const express = require('express');
const router = express.Router();
const checkauth = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { getUsuario, crearUsuario, usuarioPorId, usuarioPorCorreo } = require('../controllers/usuario.controller');

router.get('/usuario', checkauth, roleMiddleware([1, 4]), getUsuario);


router.get('/usuario/:id', checkauth, roleMiddleware([1, 4]), usuarioPorId);

router.get('/usuario/correo/:correo', usuarioPorCorreo);

router.post('/usuario/crearUsuario', checkauth, roleMiddleware([1, 4]), crearUsuario);

module.exports = router;
