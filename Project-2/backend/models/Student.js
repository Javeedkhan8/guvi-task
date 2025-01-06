const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password:{type:String,required:true},
  email: { type: String, required: true, unique: true },
  resume: { type: String, required: true },
  coverLetter: { type: String },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
});

studentSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

studentSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
