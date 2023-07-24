const express = require('express');
const router = express.Router();
const checkauth = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { getUsuario, crearUsuario, usuarioPorId, usuarioPorCorreo, editarUsuario } = require('../controllers/usuario.controller');

router.get('/usuario', checkauth, roleMiddleware([1, 4]), getUsuario);


router.get('/usuario/:id', checkauth, roleMiddleware([1, 4]), usuarioPorId);

router.get('/usuario/correo/:correo', usuarioPorCorreo);

router.post('/usuario/crearUsuario', checkauth, roleMiddleware([1, 4]), crearUsuario);

router.put('/usuario/editarUsuario/:id', checkauth, roleMiddleware([1, 4]), editarUsuario);

module.exports = router;
