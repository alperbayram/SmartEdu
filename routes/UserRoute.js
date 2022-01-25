const express = require('express');
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name'),

    body('email').isEmail()
      .withMessage('Please Enter Your Email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email is already exists! ');
          }
        });
      }),

    body('password').not().isEmpty().withMessage('Please Enter A Password'),
  ],
  AuthController.createUser
);
router.route('/login').post(AuthController.loginUser);
router.route('/logout').get(AuthController.logoutUser);
router.route('/dashboard').get(authMiddleware, AuthController.getDashboardPage);
router.route('/:id').delete(AuthController.DeleteUser);

module.exports = router;
