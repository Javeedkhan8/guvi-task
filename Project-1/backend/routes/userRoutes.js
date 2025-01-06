// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    verifyUser,
  } = require('../controllers/tempController')

// User Registration route
router.post('/register', registerUser);

// User Login route
router.post('/login', loginUser);

router.post('/authenticate',verifyUser)


module.exports = router;
