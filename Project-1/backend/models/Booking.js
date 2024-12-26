const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' }, // e.g., Pending, Confirmed, Canceled
  });
  
  module.exports = mongoose.model('Booking', bookingSchema);