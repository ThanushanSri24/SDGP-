// server.js - Node.js backend for NaviKid School Van Tracker
// Main entry point - clean and modular

// Load environment variables first
require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');

// Import routes
const routes = require('./routes');

// Initialize Express app
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// Request logging (optional - useful for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// --- Routes ---
app.use('/api', routes);

// Legacy endpoints for backward compatibility
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Legacy register-token endpoint (redirects to new path)
app.post('/api/register-token', (req, res, next) => {
  // Forward to new auth route
  req.url = '/api/auth/register-token';
  next('route');
});

// Legacy SOS endpoint (redirects to new path)
app.post('/api/sos', (req, res, next) => {
  // Forward to new SOS route
  req.url = '/api/sos/trigger';
  next('route');
});

// --- Error Handling ---
// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: error.message
  });
});

// --- Start the Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════════╗`);
  console.log(`║     NaviKid Server is Running          ║`);
  console.log(`╠════════════════════════════════════════╣`);
  console.log(`║  Environment: ${(process.env.NODE_ENV || 'development').padEnd(23)} ║`);
  console.log(`║  Port: ${String(PORT).padEnd(30)} ║`);
  console.log(`║  Firestore: ${(process.env.FIREBASE_PROJECT_ID || 'Not set').substring(0, 25).padEnd(25)} ║`);
  console.log(`╚════════════════════════════════════════╝`);
  console.log(`\n📍 API Endpoints:`);
  console.log(`   POST /api/auth/register-token`);
  console.log(`   POST /api/sos/trigger`);
  console.log(`   POST /api/trips/start`);
  console.log(`   POST /api/trips/end`);
  console.log(`   POST /api/location/update`);
  console.log(`   GET  /api/location/:driverId`);
  console.log(`   POST /api/absence/mark`);
  console.log(`   POST /api/ratings/submit`);
  console.log(`   GET  /api/ratings/vans`);
  console.log(`   GET  /api/health`);
  console.log(`\n`);
});

module.exports = app;
