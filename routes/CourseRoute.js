const express = require('express');
const CourseController = require('../controllers/CourseController');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router
  .route('/')
  .post(roleMiddleware(['admin', 'teacher']), CourseController.createCourse);
router.route('/').get(CourseController.getAllCourses);
router.route('/:slug').get(CourseController.getCourse);
router.route('/enroll').post(CourseController.EnrollCourse);
router.route('/release').post(CourseController.ReleaseCourse);

module.exports = router;
