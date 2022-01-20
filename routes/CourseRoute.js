const CourseController = require('../controllers/CourseController');
const express = require('express');

const router = express.Router();

router.route('/').post(CourseController.createCourse);
router.route('/').get(CourseController.getAllCourses);
router.route('/:slug').get(CourseController.getCourse);


module.exports = router;
