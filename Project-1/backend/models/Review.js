const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  review_text: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  moderated: { type: Boolean, default: false }, // To flag unmoderated reviews
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
