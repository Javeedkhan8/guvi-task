const express = require("express");
const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const User = require("../models/User");
const sendEmail = require("../services/emailService");
const sendSMS = require("../services/smsService");
const router = express.Router();


  // Get all bookings for a user
  router.get('/:userId', async (req, res) => {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('vehicle', 'make model year')
      .populate('user', 'username email');
    res.json(bookings);
  });
  
  // Get a booking by ID (for admin purposes)
  router.get('/admin/:bookingId', async (req, res) => {
    const booking = await Booking.findById(req.params.bookingId)
      .populate('vehicle')
      .populate('user');
    res.json(booking);
  });

  router.post('/', async (req, res) => {
    const { vehicleId, userId, start_date, end_date, total_price } = req.body;

  
    try {
      const vehicle = await Vehicle.findById(vehicleId);
      console.log('Vehicle fetched:', vehicle);
  
      if (!vehicle || !vehicle.availability) {
        return res.status(400).json({ message: 'Vehicle not available' });
      }
  
      const booking = new Booking({
        vehicle: vehicleId,
        user: userId,
        start_date,
        end_date,
        total_price,
      });
  
      await booking.save();
  
      vehicle.bookedCount += 1;
      vehicle.availability = false;
      await vehicle.save();
  
      const user = await User.findById(userId);
      const emailText = `Dear ${user.username},\n\nYour booking for ${vehicle.make} ${vehicle.model} from ${start_date} to ${end_date} has been confirmed. Total Amount: $${total_price}.`;
      sendEmail(user.email, 'Booking Confirmation', emailText);
  
      // const smsText = `Dear ${user.username}, your booking for ${vehicle.make} ${vehicle.model} from ${start_date} to ${end_date} has been confirmed. Total Amount: $${total_price}.`;
      // sendSMS(user.phone, smsText);
  
      res.json(booking);
    } catch (error) {
      console.error('Error during booking:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find and delete the booking by ID
      const booking = await Booking.findByIdAndDelete(id);
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  


  
  module.exports = router;
