const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String, required: true },
  coverLetter: { type: String },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
});

module.exports = mongoose.model('Student', studentSchema);
