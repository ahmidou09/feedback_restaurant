const express = require('express');
const router = express.Router();
const { getFeedback, getStats, getAnalytics, getTables, createTable } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.get('/feedback', protect, getFeedback);
router.get('/stats', protect, getStats);
router.get('/analytics', protect, getAnalytics);
router.get('/tables', protect, getTables);
router.post('/tables', protect, createTable);

module.exports = router;
