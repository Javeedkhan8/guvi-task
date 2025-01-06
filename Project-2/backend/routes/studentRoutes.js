const express = require('express');
const {
  registerStudent,
  loginStudent,
  getStudents,
  getStudentById,
} = require('../controllers/studentController');
const router = express.Router();

router.post('/register', registerStudent);
router.post('/login',loginStudent)
router.get('/', getStudents);
router.get('/:id', getStudentById);

module.exports = router;
