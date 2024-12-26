const express = require("express");
const Vehicle = require("../models/Vehicle");
const router = express.Router();

router.get('/analytics/popular-vehicles', async (req, res) => {
    const popularVehicles = await Vehicle.find().sort({ bookedCount: -1 }).limit(10);
    res.json(popularVehicles);
  });

  router.get('/analytics/revenue', async (req, res) => {
    const completedBookings = await Booking.find({ status: 'Confirmed' });
  
    const revenue = completedBookings.reduce((total, booking) => total + booking.totalAmount, 0);
  
    res.json({ revenue });
  });

  module.exports = router;