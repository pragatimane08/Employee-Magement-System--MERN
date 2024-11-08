const mongoose = require('mongoose');

// Define the schema first
const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  designation: String,
  gender: String,
  course: String,
  date: Date,
  active: { type: Boolean, default: true },
});

// Now export the model
module.exports = mongoose.model('user', employeeSchema);
