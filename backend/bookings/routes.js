const express = require('express');
const router = express.Router();
const Booking = require('../bookings/Booking Schema');

// Create a new booking
router.post('/', async (req, res) => {
  const { user, tour, date } = req.body;
  const newBooking = new Booking({ user, tour, date });
  await newBooking.save();
  res.status(201).json(newBooking);
});

// Get all bookings for admin
router.get('/', async (req, res) => {
  const bookings = await Booking.find().populate('user').populate('tour');
  res.status(200).json(bookings);
});

// Update booking status (admin only)
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.status(200).json(updatedBooking);
});

// Delete a booking
router.delete('/:id', async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;