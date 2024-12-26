// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password,phone} = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      phone
    });

    // Save user to database
    await user.save();

    // Return success message
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare entered password with stored hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Respond with the token
    res.status(200).json({
      message: 'Login successful',
      token,
    });

  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
