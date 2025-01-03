const express = require('express');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get user bookings (current and past)
router.get('/bookings', async (req, res) => {
  // Check if the Authorization header exists and starts with "Bearer"
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing or malformed' });
  }

  const token = authorizationHeader.split(' ')[1]; // Extract the token

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Fetch bookings associated with the userId decoded from the token
    const bookings = await Booking.find({ user: decoded.userId }).populate('vehicle').exec();
    
    // Return the bookings if successful
    res.status(200).json(bookings);
  } catch (error) {
    // Handle errors - expired or invalid token
    console.error(error);
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    // General error response
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// Get user reviews
router.get('/reviews', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    // Verify the access token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Fetch reviews for the user
    const reviews = await Review.find({ user: decoded.userId }).populate('vehicle');
    return res.status(200).json(reviews);
  } catch (error) {
    // If the token is expired, handle it
    if (error.name === 'TokenExpiredError') {
      const refreshToken = req.headers['x-refresh-token']; // Expecting the refresh token in headers

      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
      }

      try {
        // Verify the refresh token
        const refreshDecoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Generate a new access token
        const newAccessToken = jwt.sign(
          { userId: refreshDecoded.userId },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '1h' }
        );

        // Return the new token in response headers for the client to update
        res.setHeader('x-access-token', newAccessToken);

        // Fetch and return the reviews
        const reviews = await Review.find({ user: refreshDecoded.userId }).populate('vehicle');
        return res.status(200).json(reviews);
      } catch (refreshError) {
        console.error('Refresh token error:', refreshError);
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
    }

    console.error('Token error:', error);
    return res.status(403).json({ message: 'Invalid access token' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  const { name, email } = req.body;

  // Check if Authorization header is provided
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attempt to update the user profile with the provided name and email
    const updatedUser = await User.findByIdAndUpdate(decoded.userId, { name, email }, { new: true });

    // If no user is found with the provided ID
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the updated user back in the response
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error verifying token:', error);
    // Handle expired token
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please log in again' });
    }
    
    // Handle any other errors (invalid token or general errors)
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
});


module.exports = router;
