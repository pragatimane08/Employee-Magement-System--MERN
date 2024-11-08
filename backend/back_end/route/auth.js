// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../model/user'); // Ensure this path is correct
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, email, mobile, designation, gender, courses, profileImage } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Create new user
    const newUser = new User({
      username,
      password, // The pre-save hook in the User model will hash this
      email,
      mobile,
      designation,
      gender,
      courses,
      profileImage
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

module.exports = router;
