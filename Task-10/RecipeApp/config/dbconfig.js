const mongoose = require("mongoose");


const connectDB = async () => {
    try{
         await mongoose.connect("mongodb+srv://javeedkhanjohnbasha8:lYbdp1q6zPoG4CE3@cluster0.0bcid.mongodb.net/recipe")
        console.log("Database connected")
    }
    catch(error){
       console.log("Error occured : ",error.message)
    }
}

module.exports = connectDB