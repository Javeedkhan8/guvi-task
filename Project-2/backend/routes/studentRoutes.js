const express = require('express');
const {
  registerStudent,
  getStudents,
  getStudentById,
} = require('../controllers/studentController');
const router = express.Router();

router.post('/register', registerStudent);
router.get('/', getStudents);
router.get('/:id', getStudentById);

module.exports = router;
