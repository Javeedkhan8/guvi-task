// models/Interview.js
const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  jobTitle: { type: String, required: true },
  interviewDate: { type: Date, required: true },
  interviewTime: { type: String, required: true },
  interviewFormat: { type: String, enum: ['In-Person', 'Virtual'], required: true },
  status: { type: String, enum: ['Scheduled', 'Confirmed', 'Completed', 'Cancelled'], default: 'Scheduled' },
});

module.exports = mongoose.model('Interview', interviewSchema);
