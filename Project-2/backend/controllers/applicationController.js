const Application = require('../models/Application');

// Create a new application
const createApplication = async (req, res) => {
  const { student, company, jobTitle } = req.body;

  try {
    const application = await Application.create({ student, company, jobTitle });
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all applications
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('student', 'name email')
      .populate('company', 'name');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createApplication, getApplications, updateApplicationStatus };
