const jwt = require("jsonwebtoken");
require('dotenv').config()

const Middleware = (req,res,next) => {
    const token = req.header("Authorization")
    if(!token){
        res.status(401).json("Token not found,access denied")
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_KEY)
        req.user = decoded
        next()
    }
    catch(error){
        res.status(500).json({error:"Internal server error"})
    }
}
module.exports = Middleware