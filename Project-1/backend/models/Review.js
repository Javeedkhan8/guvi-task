const mongoose = require("mongoose");
const { schema } = require("./User");

const reviewSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: String,
  });

  const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;