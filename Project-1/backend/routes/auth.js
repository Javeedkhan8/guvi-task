const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY); 
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  const authHeader = req.headers.authorization;
  const refreshToken = req.headers['x-refresh-token']; // Expect the refresh token in the header

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  const token = authHeader.split(' ')[1]; // Extract the access token from the Authorization header

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    
    const user = await User.findById(decoded.userId);
    return res.status(200).json(user);
  } catch (error) {
   
    if (error.name === 'TokenExpiredError') {
      // If the access token has expired, check for the refresh token
      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
      }

      try {
        
        const refreshDecoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

       
        const newAccessToken = jwt.sign(
          { userId: refreshDecoded.userId },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '1h' } // New access token validity (1 hour)
        );

        
        res.setHeader('x-access-token', newAccessToken);

        
        const user = await User.findById(refreshDecoded.userId);
        return res.status(200).json(user);
      } catch (refreshError) {
        console.error('Error verifying refresh token:', refreshError);
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
    }

    
    console.error('Token error:', error);
    return res.status(403).json({ message: 'Invalid access token' });
  }
});

module.exports = router;
