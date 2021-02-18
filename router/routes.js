const express = require('express');
const router = express.Router();
const User = require('../Controllers/userController');
const roles = require('../Controllers/rolesController')

router.get('/users', User.getUser);
router.post('/users', User.createUser);
router.put('/users', User.updateUser);

module.exports = router;