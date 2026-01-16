const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true,
  },
  ratings: {
    overall: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    food: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    service: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    cleanliness: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  problems: [{
    type: String,
    enum: ['Slow service', 'Food quality', 'Cold food', 'Staff behavior', 'Cleanliness', 'Noise', 'Price', 'No problem', 'Other'],
  }],
  comment: {
    type: String,
    trim: true,
    maxlength: 250,
  },
  recommend: {
    type: String,
    enum: ['Yes', 'Maybe', 'No'],
    required: true,
  },
  customerInfo: {
    name: String,
    contact: String, // Email or Phone
  },
  status: {
    type: String,
    enum: ['new', 'read', 'archived'],
    default: 'new',
  },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
