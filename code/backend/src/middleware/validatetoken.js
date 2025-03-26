// Improved middleware to verify JWT token
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get the authorization header
  const authHeader = req.headers['authorization'];
  
  // Check if authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  // Check if the header has the correct format
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Token format invalid. Use Bearer token format.' });
  }
  
  const token = parts[1];
  
  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please login again.' });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    
    // Handle other potential errors
    console.error('Token verification error:', error);
    return res.status(403).json({ message: 'Token verification failed.' });
  }
};

module.exports = authenticateToken;