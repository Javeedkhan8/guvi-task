const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig")
require("dotenv").config();
const authRoutes = require("./routes/userRoutes");
const vehicleRoutes = require("./routes/vehicle");
const bookingRoutes = require("./routes/booking");
const payment = require("./routes/payment");
const review = require("./routes/review");
const admin = require("./routes/admin")

const app = express();

connectDB()

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment',payment);
app.use('/api/reviews',review);
app.use('/api/admin',admin);



app.get('/', (req, res) => {
    res.send('Vehicle Rental API is running...');
  });

const port = process.env.PORT
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})



