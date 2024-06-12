const express = require('express');
const router = express.Router();
const Tour = require('../tour/Tour Schema');

// Get all tours
router.get('/', async (req, res) => {
  const tours = await Tour.find();
  res.status(200).json(tours);
});

// Get tour by ID
router.get('/:id', async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  res.status(200).json(tour);
});

// Create a new tour (admin only)
router.post('/', async (req, res) => {
  const { title, image, duration, dates, price } = req.body;
  const newTour = new Tour({ title, image, duration, dates, price });
  await newTour.save();
  res.status(201).json(newTour);
});

// Edit a tour (admin only)
router.put('/:id', async (req, res) => {
  const { title, image, duration, dates, price } = req.body;
  const updatedTour = await Tour.findByIdAndUpdate(req.params.id, { title, image, duration, dates, price }, { new: true });
  res.status(200).json(updatedTour);
});

// Delete a tour (admin only)
router.delete('/:id', async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;