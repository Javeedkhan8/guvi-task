const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    pricePerDay: Number,
    availability: { type: Boolean, default: true },
    images: [String],
    description: String,
    rating: { type: Number, default: 0 },
  bookedCount: { type: Number, default: 0 },
  });

  module.exports = mongoose.model('Vehicle',vehicleSchema);