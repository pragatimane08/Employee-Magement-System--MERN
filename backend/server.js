// Import necessary modules
const express = require('express');
const connectDB = require('./back_end/db1/dbconn'); // Path to DB connection
const employeeRoutes = require('./back_end/route/employees'); // Employee routes path
const authRoutes = require('./back_end/route/auth'); // Authentication routes path
require('dotenv').config();
const cors = require('cors');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from your frontend
app.use(express.json()); // Parse JSON bodies for incoming requests

// Routes
app.use('/api/employees', employeeRoutes); // Employee routes
app.use('/api/auth', authRoutes); // Authentication routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
