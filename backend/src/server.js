const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const dns = require('dns');
const path = require('path');

// Load environment variables from .env file if in local development
// In Vercel, these are provided via process.env, so missing file is fine
try {
  dotenv.config({ path: path.join(__dirname, '../.env') });
} catch (error) {
  // Ignore error if .env file is missing
}

// Fail fast if DB not connected (prevent 15s+ timeouts)
mongoose.set('bufferTimeoutMS', 15000); // Throw error after 15s if not connected

// Fix for MongoDB connection error: querySrv ECONNREFUSED
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (error) {
  console.warn('Failed to set DNS servers:', error);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Database Connection
// Database Connection
// Cached connection promise
let cachedPromise = null;

// Database Connection
const connectDB = async () => {
  // Check if we have a connection to the database or if it's currently connecting
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables');
    throw new Error('MONGO_URI is not defined');
  }

  cachedPromise = mongoose.connect(process.env.MONGO_URI, {
    bufferCommands: false, // Disable Mongoose buffering
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }).then((mongoose) => {
    console.log('MongoDB connected');
    return mongoose;
  }).catch((error) => {
    console.error('MongoDB connection error:', error);
    // Restart connection on error
    cachedPromise = null;
    throw error;
  });

  return cachedPromise;
};

// Global Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start Server
if (require.main === module) {
  const startServer = async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };
  startServer();
} else {
  // For Vercel/Serverless: Export app
  module.exports = app;
}
