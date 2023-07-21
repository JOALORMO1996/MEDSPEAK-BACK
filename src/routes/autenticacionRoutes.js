const express = require('express');
const router = express.Router();
const {login} = require('../controllers/autenticacion.controller');


router.post('/autenticacion/login', login);


module.exports = router;