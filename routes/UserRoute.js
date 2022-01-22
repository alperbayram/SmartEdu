const express = require('express');
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

router.route('/signup').post(AuthController.createUser);
router.route('/login').post(AuthController.loginUser);
router.route('/logout').get(AuthController.logoutUser);
router.route('/dashboard').get(authMiddleware, AuthController.getDashboardPage);

module.exports = router;
