const express = require('express');
const router = express.Router();
const { getUsuario, crearUsuario, usuarioPorId, usuarioPorCorreo } = require('../controllers/usuario.controller');

router.get('/usuario', getUsuario);


router.get('/usuario/:id', usuarioPorId);

router.get('/usuario/correo/:correo', usuarioPorCorreo);

router.post('/crearUsuario', crearUsuario);

module.exports = router;
