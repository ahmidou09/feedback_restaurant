const mongoose = require('mongoose');
const dns = require('dns');

// Fail fast if DB not connected (prevent 15s+ timeouts)
mongoose.set('bufferTimeoutMS', 15000); 

// Fix for MongoDB connection error: querySrv ECONNREFUSED (Local Windows only)
// Don't override DNS in Vercel/Production as it handles resolution internally
if (!process.env.VERCEL) {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
  } catch (error) {
    console.warn('Failed to set DNS servers:', error);
  }
}

let cachedPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  // Only reuse cached promise if we are currently connecting (readyState 2)
  if (cachedPromise && mongoose.connection.readyState === 2) {
    return cachedPromise;
  }

  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables');
    throw new Error('MONGO_URI is not defined');
  }

  console.log('Connecting to MongoDB...');

  cachedPromise = mongoose.connect(process.env.MONGO_URI, {
    bufferCommands: false, // Disable Mongoose buffering
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4 // Use IPv4, skip trying IPv6
  }).then((mongoose) => {
    console.log('MongoDB connected successfully');
    
    // Register models explicitly to ensure they are attached to this connection
    // Note: Paths are relative to this file
    try {
        require('../models/AdminUser');
        require('../models/Restaurant');
        require('../models/Feedback');
    } catch (e) {
        console.warn('Could not register models:', e);
    }
    
    return mongoose;
  }).catch((error) => {
    console.error('MongoDB connection error:', error);
    cachedPromise = null;
    throw error;
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB runtime error:', err);
    cachedPromise = null;
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
    cachedPromise = null;
  });

  return cachedPromise;
};

module.exports = connectDB;
