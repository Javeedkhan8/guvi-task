const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User model
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true }, // Link to Vehicle model
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  total_price: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
