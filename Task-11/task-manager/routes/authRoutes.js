const express = require("express")
const Middleware = require("../middleware/authMiddleware")
const router = express.Router();
const {Registeruser,loginuser,getInfo} = require("../controllers/authController")

router.post("/register",Registeruser)

router.post("/login",loginuser)

router.get("/profile",Middleware,getInfo)

module.exports = router