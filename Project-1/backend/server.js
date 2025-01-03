const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConfig")
require("dotenv").config();
const vehicleRoutes = require("./routes/vehicle");
const bookingRoutes = require("./routes/booking");
const paymentRoutes = require("./routes/payment")
const reportRoutes = require('./routes/reports');
const authRoutes = require("./routes/auth");
const Dashboard = require("./routes/dashboard");
const Reviews =require("./routes/reviews")
const rentalHistoryRoutes = require('./routes/rentalHistory');
const bodyParser = require("body-parser");
require("dotenv").config();


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

connectDB();

// API Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/vehicles/reports', reportRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', Dashboard);
app.use('/api/vehicles/rentalhistory', rentalHistoryRoutes);
app.use('/api/payment',paymentRoutes);
app.use('/api/reviews',Reviews);




// Root Route
app.get('/', (req, res) => {
  res.send('Online Vehicle Rental System Backend');
});

const port = process.env.PORT
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})