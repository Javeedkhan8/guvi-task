// controllers/interviewController.js
const Interview = require('../models/InterviewSchedule');
const sendEmailNotification = require('../utils/sendEmailNotification');

// Schedule a new interview
const scheduleInterview = async (req, res) => {
  const { student, company, jobTitle, interviewDate, interviewTime, interviewFormat } = req.body;

  try {
    const interview = await Interview.create({
      student,
      company,
      jobTitle,
      interviewDate,
      interviewTime,
      interviewFormat
    });
     // Send email notification
     await sendEmailNotification(
      student.email,
      'Interview Scheduled',
      `Your interview for the position of ${jobTitle} at ${company.name} has been scheduled on ${interviewDate} at ${interviewTime}. The interview will be conducted ${interviewFormat}.`
    );
    res.status(201).json(interview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Confirm an interview
const confirmInterview = async (req, res) => {
  const { id } = req.params;

  try {
    const interview = await Interview.findByIdAndUpdate(
      id,
      { status: 'Confirmed' },
      { new: true }
    );
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all interviews
const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate('student', 'name email')
      .populate('company', 'name');
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { scheduleInterview, confirmInterview, getInterviews };
