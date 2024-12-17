const user = require("../models/authModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const Registeruser = async (req,res)=> {
    try{
        const {username,email,password} = req.body
        const existinguser = await user.findOne({email})
        if(existinguser){
            res.status(401).json("User already exists")
        }
        const newUser = await user.create({username,email,password})
        res.status(201).json({user,message:"Registered sucessfully"})
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

const loginuser = async (req,res) => {
    try{
        const {email,password} = req.body
        const Users  = await user.findOne({email})
        if(!Users){
            return res.status(401).json("user not found")
        }
        const isMatch = await bcrypt.compare(password,Users.password)
        if(!isMatch){
            return res.status(401).json("Invalid credentials")
        }
        const token = jwt.sign(
            { userId: Users._id.toString(), role: "Admin" },
            process.env.JWT_KEY,
            {
                expiresIn : process.env.JWT_EXPIRES,
            }
        )
        res.status(200).json({ token, message: "Login successfully" })
    }
    catch(error){
        res.status(500).json({error:"Internal server error"})
    }
}

const getInfo = async (req,res) => {
    try{
       const {user} = req
       res.status(200).json({user});
    }
    catch{
        res.status(500).json({error:"Internal server error"})  
    }
}

module.exports = {
    Registeruser,loginuser,getInfo
}