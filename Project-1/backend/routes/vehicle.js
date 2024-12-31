const express = require('express');
const Vehicle = require('../models/Vehicle'); // Import Mongoose model
const router = express.Router();

// Get all vehicles with optional filters
router.get('/', async (req, res) => {
  try {
    const { make, model, location, minPrice, maxPrice, type } = req.query;

    const filters = {
      ...(make && { make: new RegExp(make, 'i') }),
      ...(model && { model: new RegExp(model, 'i') }),
      ...(location && { location: new RegExp(location, 'i') }),
      ...(type && { vehicle_type: type }),
      ...(minPrice && { price_per_day: { $gte: parseFloat(minPrice) } }),
      ...(maxPrice && { price_per_day: { $lte: parseFloat(maxPrice) } }),
    };

    const vehicles = await Vehicle.find(filters);
    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching vehicles' });
  }
});

// Add a new vehicle
router.post('/', async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error adding vehicle' });
  }
});

// Update a vehicle
router.put('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error updating vehicle' });
  }
});

// Delete a vehicle
router.delete('/:id', async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error deleting vehicle' });
  }
});

module.exports = router;
