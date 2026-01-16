const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  number: {
    type: String, // String to allow "12A" etc.
    required: true,
  },
  qrCodeUrl: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// Compound index to ensure unique table numbers per restaurant
tableSchema.index({ restaurant: 1, number: 1 }, { unique: true });

module.exports = mongoose.model('Table', tableSchema);
