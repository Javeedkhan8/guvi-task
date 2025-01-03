const express = require("express");
const Vehicle = require("../models/Vehicle")

const router = express.Router();

// Create a new vehicle
router.post('/add', async (req, res) => {
  const { make, model, year,image, price_per_day,availability,average_rating,user } = req.body;

  const vehicle = new Vehicle({
    make, model, year, image,price_per_day,availability,average_rating,user
  });
  await vehicle.save();

  res.json({ message: 'Vehicle added successfully' });
});

// Get all vehicles
router.get('/', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

// Get a vehicle by ID
router.get('/:id', async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.json(vehicle);
});

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
router.post('/add', adminMiddleware, async (req, res) => {
  // Only admin can add vehicles
});

module.exports = router;
