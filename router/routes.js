const express = require('express');
const router = express.Router();
const User = require('../Controllers/userController');
const roles = require('../Controllers/rolesController')
const userModel = require('../models/users');

router.get('/users', User.getUser);
router.post('/users', User.createUser);
router.put('/users/:id', User.updateUser);
router.post('/upload',User.upload.single('file'), User.uploadFile);

module.exports = router;