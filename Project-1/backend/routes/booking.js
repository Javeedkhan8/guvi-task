const express = require("express");
const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const User = require("../models/User");
const sendEmail = require("../services/emailService");
const mongoose = require("mongoose");

const router = express.Router();

router.post('/', async (req, res) => {
  const { vehicleId, userId,} = req.body;
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);
  const totalAmount = req.body.totalAmount;


  console.log({vehicleId,
    userId,
    startDate,
    endDate,
    totalAmount,})

  if (!vehicleId || !userId || !startDate || !endDate || totalAmount == undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: 'Invalid vehicleId' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
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
    vehicle.availability = true;
    await vehicle.save();

    // Respond to the frontend
    res.json({ message: 'Booking created successfully', booking });


    // Send email and SMS notifications (asynchronous)
    const user = await User.findById(userId);
    if (user) {
      const emailText = `Dear ${user.username},\n\nYour booking for ${vehicle.make} ${vehicle.model} from ${startDate} to ${endDate} has been confirmed. Total Amount: $${totalAmount}.\n\nThank you for using our service!`;
      sendEmail(user.email, 'Booking Confirmation', emailText).catch((err) => console.error('Error sending email:', err.message));
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('vehicle', 'make model year')
      .populate('user', 'username email');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

router.get('/admin/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate('vehicle')
      .populate('user');
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching booking' });
  }
});

module.exports = router;
