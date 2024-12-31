const Student = require('../models/Student');

// Register a new student
const registerStudent = async (req, res) => {
  const { name, email, resume, coverLetter } = req.body;

  try {
    const student = await Student.create({ name, email, resume, coverLetter });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerStudent, getStudents, getStudentById };
