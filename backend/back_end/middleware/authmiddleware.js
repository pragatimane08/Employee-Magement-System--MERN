const jwt = require('jsonwebtoken');
require('dotenv').config();  // Ensure you have the JWT_SECRET defined in .env file

const authMiddleware = (req, res, next) => {
  // Check for token in the request header
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Using JWT_SECRET from .env
    req.user = decoded;  // Add decoded user info to request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;  // Export middleware
