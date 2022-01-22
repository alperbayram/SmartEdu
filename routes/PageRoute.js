const express = require('express');
const PageController = require('../controllers/PageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');


const router = express.Router();

router.route('/').get(PageController.getIndexPage);
router.route('/about').get(PageController.getAboutPage);
router.route('/register').get(redirectMiddleware ,PageController.getRegisterPage);
router.route('/login').get(redirectMiddleware ,PageController.getLoginPage);

module.exports = router;
