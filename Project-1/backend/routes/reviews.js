const express = require('express');
const Review = require('../models/Review');
const Vehicle = require('../models/Vehicle');
const router = express.Router();

// Submit a review for a vehicle
router.post('/', async (req, res) => {
  const { user, vehicle, rating, review_text } = req.body;

  try {
    const review = new Review({ user, vehicle, rating, review_text });
    await review.save();

    // Update the vehicle's average rating (optional)
    const reviews = await Review.find({ vehicle });
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    await Vehicle.findByIdAndUpdate(vehicle, { average_rating: avgRating });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting review' });
  }
});

// Get reviews for a vehicle
router.get('/:vehicleId', async (req, res) => {
  try {
    const reviews = await Review.find({ vehicle: req.params.vehicleId }).populate('user', 'name email');
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// Moderate a review (admin functionality)
router.put('/moderate/:reviewId', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.reviewId, { moderated: true }, { new: true });
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error moderating review' });
  }
});

module.exports = router;
