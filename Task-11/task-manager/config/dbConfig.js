const mongoose = require("mongoose");
require('dotenv').config()

const connectDB = async () => {
    try{
        const user = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected")
    }
    catch(error){
        console.log("Error occured : ",error.message)
    }
}
module.exports = connectDB