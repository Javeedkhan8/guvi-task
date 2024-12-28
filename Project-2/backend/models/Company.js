const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  jobOpenings: [{ type: String }],
  contactNumber: { type: String },
  website: { type: String },
  description: { type: String },
});

module.exports = mongoose.model('Company', companySchema);
