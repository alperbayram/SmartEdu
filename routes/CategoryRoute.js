const CategoryController = require('../controllers/CategoryController');
const express = require('express');

const router = express.Router();

router.route('/').post(CategoryController.createCategory); // /categories

module.exports = router;
