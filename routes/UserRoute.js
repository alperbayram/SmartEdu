const AuthController = require('../controllers/AuthController');
const express = require('express');

const router = express.Router();

router.route('/signup').post(AuthController.createUser);
router.route('/login').post(AuthController.loginUser);

module.exports = router;
