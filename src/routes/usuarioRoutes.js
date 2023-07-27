const express = require('express');
const router = express.Router();
const checkauth = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { getUsuario, crearUsuario, usuarioPorId, usuarioPorCorreo, editarUsuario, inactivarUsuario, activarUsuario } = require('../controllers/usuario.controller');

router.get('/usuario', checkauth, roleMiddleware([1, 4]), getUsuario);

router.get('/usuario/:id', checkauth, roleMiddleware([1, 4]), usuarioPorId);

router.get('/usuario/correo/:correo', usuarioPorCorreo);

router.post('/usuario/crearUsuario', checkauth, roleMiddleware([1, 4]), crearUsuario);

router.put('/usuario/editarUsuario/:id', checkauth, roleMiddleware([1, 4]), editarUsuario);

router.put('/usuario/inactivarUsuario/:id', inactivarUsuario, checkauth, roleMiddleware([1, 4]),);

router.put('/usuario/activarUsuario/:id', activarUsuario, checkauth, roleMiddleware([1, 4]),);

module.exports = router;
