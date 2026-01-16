const mongoose = require('mongoose');
const Feedback = require('../models/Feedback');
const Table = require('../models/Table');
const Restaurant = require('../models/Restaurant');

// @desc    Submit new feedback
// @route   POST /api/feedback
// @access  Public
exports.createFeedback = async (req, res) => {
  try {
    const { restaurantId, tableId, ratings, problems, comment, recommend } = req.body;

    // 1. Basic Validation
    if (!restaurantId || !tableId || !ratings || !recommend) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const { overall, food, service, cleanliness } = ratings;
    if (!overall || !food || !service || !cleanliness) {
      return res.status(400).json({ message: 'All ratings are required' });
    }

    // 2. Check existence of Restaurant and Table
    const restaurantExists = await Restaurant.findById(restaurantId);
    if (!restaurantExists) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    let table = null;
    // Try to find by ID first
    if (mongoose.Types.ObjectId.isValid(tableId)) {
      table = await Table.findById(tableId);
    }
    
    // If not found by ID, try to find by Number and Restaurant
    if (!table) {
      table = await Table.findOne({ restaurant: restaurantId, number: tableId });
    }

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    
    // Use the actual Table ID for the feedback record
    const actualTableId = table._id;

    // 3. Spam Prevention (Rate Limiting)
    // Check if feedback was submitted for this table in the last 10 minutes
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const recentFeedback = await Feedback.findOne({
      table: actualTableId,
      createdAt: { $gte: tenMinutesAgo },
    });

    if (recentFeedback) {
      return res.status(429).json({ 
        message: 'Feedback already submitted recently. Please try again later.' 
      });
    }

    // 4. Create Feedback
    const feedback = await Feedback.create({
      restaurant: restaurantId,
      table: actualTableId,
      ratings,
      problems,
      comment,
      recommend,
    });

    res.status(201).json({
      success: true,
      data: feedback,
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
