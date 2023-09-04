const express = require('express');
const router = express.Router();
const {login, sendRecoveryEmail, resetPassword} = require('../controllers/autenticacion.controller');


router.post('/autenticacion/login', login);

router.post('/recuperarContrasenia', sendRecoveryEmail);

router.post('/restablecerContrasenia/:token', resetPassword)


module.exports = router;