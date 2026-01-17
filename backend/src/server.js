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
mongoose.set('bufferTimeoutMS', 2500); // Throw error after 2.5s if not connected

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
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is not defined in environment variables');
      throw new Error('MONGO_URI is not defined');
    }

    // Optimize for serverless: fail fast if no connection, don't buffer
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false, // Disable Mongoose buffering
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Only exit process in local development, not in serverless environment
    if (require.main === module) {
      process.exit(1);
    } else {
        // Re-throw in serverless so the request fails cleanly with 500
        throw error;
    }
  }
};

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start Server
if (require.main === module) {
  const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  };
  startServer();
} else {
  // For Vercel/Serverless: Connect but don't blocking wait indefinitely (mongoose buffers)
  // Ensure connection is attempted
  connectDB();
  module.exports = app;
}
