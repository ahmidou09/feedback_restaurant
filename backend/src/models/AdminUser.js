const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    // Optional initially if they create a restaurant after signup, 
    // but usually linked.
  },
  role: {
    type: String,
    enum: ['superadmin', 'restaurant_admin'],
    default: 'restaurant_admin',
  },
}, { timestamps: true });

module.exports = mongoose.model('AdminUser', adminUserSchema);
