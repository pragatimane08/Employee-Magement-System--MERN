// model/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, required: true },
  designation: { type: String, enum: ['HR', 'Manager', 'Sales'], required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  courses: [{ type: String }],
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
