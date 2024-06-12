const express = require('express');
const router = express.Router();
const User = require('../user/User Schema');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  await newUser.save();
  res.status(201).json(newUser);
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

// Get user profile
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('bookedTours');
  res.status(200).json(user);
});

module.exports = router;
