const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const verifyToken = require('../middleware/authJwt');

router.get('/', verifyToken, userController.getAllUsers);

router.post('/', verifyToken, userController.createUser);

router.get('/:id', verifyToken, userController.getUserById);

router.put('/:id', verifyToken, userController.updateUserById);

router.delete('/:id', verifyToken, userController.removeUserById);

module.exports = router;