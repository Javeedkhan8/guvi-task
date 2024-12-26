const express = require("express");
const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const User = require("../models/User");
const sendEmail = require("../services/emailService");
const sendSMS = require("../services/smsService");
const router = express.Router();

router.post('/', async (req, res) => {
  const { vehicleId, userId, startDate, endDate, totalAmount } = req.body;

  // Check vehicle availability
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle || !vehicle.availability) {
    return res.status(400).json({ message: 'Vehicle not available' });
  }

  const booking = new Booking({
    vehicle: vehicleId,
    user: userId,
    startDate,
    endDate,
    totalAmount,
  });

  // Save the booking
  await booking.save();

  // Mark vehicle as unavailable
  vehicle.availability = false;
  await vehicle.save();

  res.json(booking);

  // Get the user's email from the database
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Send email confirmation
  const emailText = `Dear ${user.username},\n\nYour booking for ${vehicle.make} ${vehicle.model} from ${startDate} to ${endDate} has been confirmed. Total Amount: $${totalAmount}.\n\nThank you for using our service!`;
  try {
    await sendEmail(user.email, 'Booking Confirmation', emailText);
  } catch (err) {
    console.error('Error sending email:', err.message);
  }


  const smsText = `Dear ${user.username}, your booking for ${vehicle.make} ${vehicle.model} from ${startDate} to ${endDate} has been confirmed. Total Amount: $${totalAmount}.`;
  try {
    await sendSMS(user.phone.startsWith('+') ? user.phone: `+${user.phone}`, smsText);
  } catch (err) {
    console.error('Error sending SMS:', err.message);
  }


});

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

  
  module.exports = router;
