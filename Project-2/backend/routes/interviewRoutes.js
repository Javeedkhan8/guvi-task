// routes/interviewRoutes.js
const express = require('express');
const {
  scheduleInterview,
  confirmInterview,
  getInterviews
} = require('../controllers/interviewController');
const router = express.Router();

// Schedule an interview
router.post('/schedule', scheduleInterview);

// Confirm an interview
router.patch('/:id/confirm', confirmInterview);

// Get all interviews
router.get('/', getInterviews);

module.exports = router;
