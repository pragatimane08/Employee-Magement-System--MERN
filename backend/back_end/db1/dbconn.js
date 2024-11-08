// db1/dbconn.js
const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect('mongodb://localhost:27017/Emp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Connection error', error);
    process.exit(1);
  });
};

module.exports = connectDB;
