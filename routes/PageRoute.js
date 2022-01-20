const PageController = require('../controllers/PageController');
const express = require('express');

const router = express.Router();

router.route('/').get(PageController.getIndexPage);
router.route('/about').get(PageController.getAboutPage);
router.route('/register').get(PageController.getRegisterPage);
router.route('/login').get(PageController.getLoginPage);

module.exports = router;
