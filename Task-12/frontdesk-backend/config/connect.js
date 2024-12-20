const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

async function connect(){
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set('strictQuery', true)
    
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log("Established DB connection");
    return db;
}

module.exports = connect