const express = require('express');
const connectDB = require('./config/dbConfig');
const cors = require('cors');
const bodyParser = require('body-parser');
const vehicleRoutes = require('./routes/vehicle');
const bookingRoutes = require("./routes/booking");
const paymentRoutes = require("./routes/payment")
const reportRoutes = require('./routes/reports');
const authRoutes = require("./routes/auth");
const Dashboard = require("./routes/dashboard");
const Reviews =require("./routes/reviews")
const rentalHistoryRoutes = require('./routes/rentalHistory');
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(bodyParser.json());

connectDB();

// API Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment/',paymentRoutes);
app.use('api/reports',reportRoutes);
app.use('/api/auth',authRoutes)
app.use('/api/dashboard',Dashboard);
app.use('/api/reviews',Reviews)
app.use('/api/vehicles',rentalHistoryRoutes)

// Root Route
app.get('/', (req, res) => {
  res.send('Online Vehicle Rental System Backend');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
