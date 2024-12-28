const express = require("express");
const Vehicle = require("../models/Vehicle");

const router = express.Router();

// Middleware to check admin access
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

// Create a new vehicle (only for admin)
router.post('/add', adminMiddleware, async (req, res) => {
  const { make, model, year, pricePerDay, images, description } = req.body;

  try {
    const vehicle = new Vehicle({
      make,
      model,
      year,
      pricePerDay,
      images,
      description,
      availability: true, // Default availability
    });
    await vehicle.save();

    res.status(201).json({ message: 'Vehicle added successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle', error: error.message });
  }
});

// Get all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
  }
});

// Get a vehicle by ID
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle details', error: error.message });
  }
});

// Update vehicle availability after booking
router.patch('/:id/availability', async (req, res) => {
  const { availability } = req.body;

  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    vehicle.availability = availability; // Update availability
    await vehicle.save();

    res.json({ message: 'Vehicle availability updated successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle availability', error: error.message });
  }
});

module.exports = router;
