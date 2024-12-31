// routes/rentalHistory.js
const express = require('express');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Route to fetch rental history
router.get('/:vehicleId/:userId/rental-history', async (req, res) => {
  try {
    const { vehicleId, userId } = req.params; // Both vehicleId and userId from URL params
    console.log('Authorization Header:', req.headers.authorization)

    // Verify Authorization Header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace with your secret
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Ensure the user making the request matches the userId in params
    if (decodedToken.id !== userId) {
      return res.status(403).json({ message: 'Unauthorized access to rental history' });
    }

    // Find the vehicle by ID
    const vehicle = await Vehicle.findById(vehicleId).populate('user', 'name email');
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Fetch all bookings related to this vehicle and user
    const bookings = await Booking.find({ vehicle: vehicleId, user: userId }).populate('user', 'name email');
    if (bookings.length === 0) {
      return res.status(200).json({ message: 'No rental history found for this vehicle.' });
    }

    // Prepare the rental history data
    const rentalHistory = bookings.map((booking) => ({
      userName: booking.user.name,
      userEmail: booking.user.email,
      start_date: new Date(booking.start_date).toLocaleDateString(),
      end_date: new Date(booking.end_date).toLocaleDateString(),
      duration: Math.ceil((new Date(booking.end_date) - new Date(booking.start_date)) / (1000 * 60 * 60 * 24)), // Duration in days
      total_price: booking.total_price,
    }));

    // Respond with rental history data
    res.status(200).json(rentalHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching rental history' });
  }
});


module.exports = router;
