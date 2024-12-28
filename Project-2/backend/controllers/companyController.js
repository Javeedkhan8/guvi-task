const Company = require('../models/Company');

// Create a new company
const createCompany = async (req, res) => {
  try {
    const { name, email, phone, website, description } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    // Create a new company instance
    const newCompany = new Company({
      name,
      email,
      jobOpenings,
      contactNumber,
      website,
      description,
    });

    // Save the company to the database
    const savedCompany = await newCompany.save();

    // Respond with the created company
    res.status(201).json(savedCompany);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Failed to create company. Please try again.' });
  }
};

// Get all companies
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCompany, getCompanies };
