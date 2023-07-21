const express = require('express');
const router = express.Router();
const checkauth = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {getRoles} = require('../controllers/rol.controller');



router.get('/roles', checkauth, roleMiddleware([1, 4]), getRoles);

module.exports = router;