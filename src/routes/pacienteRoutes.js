const express = require('express');
const router = express.Router();
const checkauth = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { getPacientes, crearPaciente, editarPaciente, inactivarPaciente, activarPaciente, getEstadoCivil} = require('../controllers/paciente.controller');



router.get('/paciente', checkauth, roleMiddleware([1, 4]), getPacientes);
router.post('/paciente/crearPaciente', checkauth, roleMiddleware([1, 4]), crearPaciente);
router.put('/paciente/editarPaciente/:id', checkauth, roleMiddleware([1, 4]), editarPaciente);

router.put('/paciente/inactivarPaciente/:id', inactivarPaciente, checkauth, roleMiddleware([1, 4]),);

router.put('/paciente/activarPaciente/:id', activarPaciente, checkauth, roleMiddleware([1, 4]),);

router.get('/paciente/estado_civil', checkauth, roleMiddleware([1, 4]), getEstadoCivil);

module.exports = router;