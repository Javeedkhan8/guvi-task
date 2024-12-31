const express = require('express');
const {
  createApplication,
  getApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const router = express.Router();

router.post('/create', createApplication);
router.get('/', getApplications);
router.patch('/:id/status', updateApplicationStatus);

module.exports = router;
