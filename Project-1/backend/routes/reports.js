// routes/reports.js
const express = require('express');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const router = express.Router();

// Generate rental history report for a vehicle (admin or owner)
router.get('/:vehicleId', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Fetch all bookings linked to this vehicle
    const bookings = await Booking.find({ vehicle: req.params.vehicleId }).populate('user', 'name email');

    // Generate summary report
    const totalBookings = bookings.length;
    const totalDuration = bookings.reduce((acc, booking) => {
      const duration = (new Date(booking.end_date) - new Date(booking.start_date)) / (1000 * 60 * 60 * 24); // Duration in days
      return acc + duration;
    }, 0);
    const totalEarnings = bookings.reduce((acc, booking) => acc + booking.total_price, 0);

    const report = {
      totalBookings,
      totalDuration,
      totalEarnings,
      bookings: bookings.map(booking => ({
        user: booking.user.name,
        start_date: new Date(booking.start_date).toLocaleDateString(),
        end_date: new Date(booking.end_date).toLocaleDateString(),
        duration: (new Date(booking.end_date) - new Date(booking.start_date)) / (1000 * 60 * 60 * 24),
        total_price: booking.total_price,
      })),
    };

    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating rental report' });
  }
});

module.exports = router;
