const Feedback = require('../models/Feedback');
const Table = require('../models/Table');

// @desc    Get all feedback (with filters)
// @route   GET /api/admin/feedback
// @access  Private (Admin)
exports.getFeedback = async (req, res) => {
  try {
    const { rating, problem, startDate, endDate } = req.query;

    let query = {};

    // Filter by Rating (Overall)
    if (rating) {
      query['ratings.overall'] = parseInt(rating);
    }

    // Filter by Problem
    if (problem) {
      query.problems = problem;
    }

    // Filter by Date Range
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const feedback = await Feedback.find(query)
      .populate('table', 'number')
      .sort({ createdAt: -1 });

    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get feedback statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getStats = async (req, res) => {
  try {
    // 1. General Stats (Counts & Averages)
    const stats = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          totalFeedback: { $sum: 1 },
          avgOverall: { $avg: '$ratings.overall' },
          avgFood: { $avg: '$ratings.food' },
          avgService: { $avg: '$ratings.service' },
          avgCleanliness: { $avg: '$ratings.cleanliness' },
        },
      },
    ]);

    // 2. Most Common Problems
    const problemStats = await Feedback.aggregate([
      { $unwind: '$problems' },
      {
        $group: {
          _id: '$problems',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // 3. Feedback per Day (Last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyStats = await Feedback.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
          avgRating: { $avg: '$ratings.overall' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      overview: stats[0] || {
        totalFeedback: 0,
        avgOverall: 0,
        avgFood: 0,
        avgService: 0,
        avgCleanliness: 0,
      },
      topProblems: problemStats,
      dailyTrend: dailyStats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get advanced problem analytics
// @route   GET /api/admin/analytics
// @access  Private (Admin)
exports.getAnalytics = async (req, res) => {
  try {
    // 1. Problems by Type (Count)
    const problemsByType = await Feedback.aggregate([
      { $unwind: '$problems' },
      { $match: { problems: { $ne: 'No problem' } } },
      {
        $group: {
          _id: '$problems',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // 2. Problems by Table (Hotspots)
    const problemsByTable = await Feedback.aggregate([
      { $unwind: '$problems' },
      { $match: { problems: { $ne: 'No problem' } } },
      {
        $group: {
          _id: '$table',
          problemCount: { $sum: 1 },
          problems: { $push: '$problems' }, // Optional: list problems
        },
      },
      { $sort: { problemCount: -1 } },
      { $limit: 10 }, // Top 10 worst tables
      {
        $lookup: {
          from: 'tables',
          localField: '_id',
          foreignField: '_id',
          as: 'tableInfo',
        },
      },
      { $unwind: '$tableInfo' },
      {
        $project: {
          tableNumber: '$tableInfo.number',
          problemCount: 1,
          // mostCommonProblem: { $arrayElemAt: ['$problems', 0] } // Simplification
        },
      },
    ]);

    res.json({
      problemsByType,
      problemsByTable,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all tables
// @route   GET /api/admin/tables
// @access  Private (Admin)
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find({ restaurant: req.user.restaurant }).sort({ number: 1 });
    res.json(tables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new table
// @route   POST /api/admin/tables
// @access  Private (Admin)
exports.createTable = async (req, res) => {
  try {
    const { number } = req.body;

    if (!number) {
      return res.status(400).json({ message: 'Table number is required' });
    }

    // Check if table already exists
    const existingTable = await Table.findOne({
      restaurant: req.user.restaurant,
      number,
    });

    if (existingTable) {
      return res.status(400).json({ message: 'Table number already exists' });
    }

    // Generate QR URL
    const clientUrl = process.env.CLIENT_URL || req.get('origin') || 'http://localhost:5173';
    const qrCodeUrl = `${clientUrl}/feedback/${req.user.restaurant}/${number}`;

    const table = await Table.create({
      restaurant: req.user.restaurant,
      number,
      qrCodeUrl,
    });

    res.status(201).json(table);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
