const CategoryController = require('../controllers/CategoryController');
const express = require('express');

const router = express.Router();

router.route('/').post(CategoryController.createCategory); // /categories
router.route('/:id').delete(CategoryController.DeleteCategory); // /categories


module.exports = router;
