// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser
  } = require('../controllers/tempController')

// User Registration route
router.post('/register', registerUser);

// User Login route
router.post('/login', loginUser);

module.exports = router;
