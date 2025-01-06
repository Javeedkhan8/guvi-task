const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerAdmin = async (req, res) => {
    const { name,password, email } = req.body;
  
    try {
      const admin = await Admin.create({ name, email,password });
      res.status(201).json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const loginAdmin =  async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ message: 'Admin not found' });
      }
  
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET_KEY); 
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    }
  };

  module.exports = {registerAdmin,loginAdmin}