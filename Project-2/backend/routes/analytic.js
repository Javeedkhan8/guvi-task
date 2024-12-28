const express = require('express');
const router = express.Router();
const { getReports } = require('../controllers/analyticsController');

// GET /api/reports - Fetch analytics data
router.get('/reports', getReports);

module.exports = router;
