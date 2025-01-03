const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  image: String,
  price_per_day: Number,
  availability: { type: Boolean, default: true },
  average_rating: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true, // Make it required if every vehicle must belong to a user
  },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
