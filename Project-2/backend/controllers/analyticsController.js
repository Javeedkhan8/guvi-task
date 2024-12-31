const Application = require('../models/Application');
const Interview = require("../models/InterviewSchedule");
const Student = require('../models/Student');

const getReports = async (req, res) => {
  try {
    // Total applications
    const totalApplications = await Application.countDocuments();

    // Applications grouped by status
    const applicationsByStatus = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Total interviews
    const totalInterviews = await Interview.countDocuments();

    // Interviews grouped by status
    const interviewsByStatus = await Interview.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Placement success rate
    const studentsPlaced = await Application.countDocuments({ status: 'Offered' });
    const totalStudents = await Student.countDocuments();
    const placementSuccessRate = totalStudents > 0 ? (studentsPlaced / totalStudents) * 100 : 0;

    res.json({
      totalApplications,
      applicationsByStatus,
      totalInterviews,
      interviewsByStatus,
      placementSuccessRate,
    });
  } catch (error) {
    console.error('Error generating reports:', error);
    res.status(500).json({ error: 'Failed to generate reports.' });
  }
};

module.exports = {
  getReports,
};