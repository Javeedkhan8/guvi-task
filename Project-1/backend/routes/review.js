const express = require("express");
const Review = require("../models/Review");
const Vehicle = require("../models/Vehicle");

const router = express.Router();

// Create a review
router.post('/', async (req, res) => {
    const { vehicleId, userId, rating, reviewText } = req.body;
  
    const review = new Review({
      vehicle: vehicleId,
      user: userId,
      rating,
      reviewText,
    });
  
    await review.save();
  
    // Update vehicle's average rating (optional)
    const vehicle = await Vehicle.findById(vehicleId);
    const reviews = await Review.find({ vehicle: vehicleId });
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    vehicle.rating = averageRating;
    await vehicle.save();
  
    res.json(review);
  });
  
  // Get reviews for a vehicle
  router.get('/:vehicleId', async (req, res) => {
    const reviews = await Review.find({ vehicle: req.params.vehicleId }).populate('user', 'username');
    res.json(reviews);
  });
  
  module.exports = router;