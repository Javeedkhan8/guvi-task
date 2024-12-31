const express = require('express');
const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const router = express.Router();

// Book a vehicle
router.post('/', async (req, res) => {
  try {
    const { user, vehicle, start_date, end_date } = req.body;

    // Check if vehicle exists
    const vehicleData = await Vehicle.findById(vehicle);
    if (!vehicleData) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    console.log('Vehicle data:', vehicleData); // Debug: Check vehicle details

    // Check availability
    const overlappingBooking = await Booking.findOne({
      vehicle,
      status: 'confirmed',
      $or: [
        { start_date: { $lte: end_date }, end_date: { $gte: start_date } },
      ],
    });

    if (overlappingBooking) {
      return res.status(400).json({ message: 'Vehicle is not available for these dates.' });
    }

    // Calculate total price
    const days = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24));
    console.log('Total days:', days); // Debug: Check calculated days
    console.log('Price per day:', vehicleData.price_per_day); // Debug: Check price_per_day

    const total_price = days * vehicleData.price_per_day;

    // Create booking
    const booking = new Booking({ user, vehicle, start_date, end_date, total_price });
    await booking.save();

    console.log('Booking created:', booking); // Debug: Check created booking

    // TODO: Trigger email notification here
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

// Modify a booking
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating booking' });
  }
});

// Cancel a booking
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
    res.status(200).json({ message: 'Booking cancelled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error cancelling booking' });
  }
});

module.exports = router;
