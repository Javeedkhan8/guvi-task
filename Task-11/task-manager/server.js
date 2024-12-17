const express = require("express");
const connectDB = require("./config/dbConfig");
const bodyparser = require("body-parser")
require('dotenv').config();
const authRoutes = require("./routes/authRoutes")

const app = express();

app.use(bodyparser.json());
connectDB();

app.use("/api/auth",authRoutes)

const port = process.env.PORT
app.listen(port,() => {
    console.log(`server running on ${port}`)
})



