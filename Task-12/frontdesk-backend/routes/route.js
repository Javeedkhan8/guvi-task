const express = require("express");

const router = express.Router();
const {register,
    verifyUser,
    getUser,
    verifyOTP,
    createResetSession,
    generateOTP,
    updateUser,
    resetPassword,
    login
} = require("../controllers/appController");

const { registerMail } = require("../config/mailer");
const { Auth,localVeriables } = require("../middlewares/auth");


/** POST methods */
router.route('/register').post(register); //register user
router.route('/registerMail').post(registerMail); //send the email
router.route('/authenticate').post(verifyUser, (req, res)=> res.end()); //authenticate user
router.route('/login').post(verifyUser,login); //login in app


/** GET methods */
router.route('/user/:username').get(getUser); //user with username
router.route('/generateOTP').get(verifyUser, localVeriables, generateOTP); //generate random OTP
router.route('/verifyOTP').get(verifyUser, verifyOTP); //verify generated OTP
router.route('/createResetSession').get(createResetSession); // reset all the veriables


/** PUT methods */
router.route('/updateUser').put(Auth,updateUser); //is use to update the user profile
router.route('/resetPassword').put(verifyUser, resetPassword); //use the rest password

module.exports = router;
