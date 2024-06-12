const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tourApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const userRoutes = require('./user/routes');
const tourRoutes = require('./tour/routes');
const bookingRoutes = require('./bookings/routes');

app.use('/user/User Schema.js', userRoutes);
app.use('/tour/Tour Schema.js', tourRoutes);
app.use('/bookings/Booking Schema.js', bookingRoutes);

// Start the server
const PORT = process.env.PORT || 5030;//port 5030
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});