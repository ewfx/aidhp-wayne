const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
const authenticateToken = require('../middleware/validatetoken');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, password, type, ...additionalDetails } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Validate required fields based on user type
    const requiredFields =
      type === 'individual'
        ? ['age', 'gender', 'interests', 'preferences', 'income']
        : ['industry', 'financialNeeds', 'preferences', 'revenues'];

    const missingFields = requiredFields.filter((field) => !additionalDetails[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: 'Missing required fields',
        missingFields,
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      type,
      ...additionalDetails,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Fetch user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Refresh token
const refreshToken = (req, res) => {
  const newToken = jwt.sign(
    { id: req.user.id, username: req.user.username },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '1h' }
  );

  res.json({ token: newToken });
};

// Logout (client-side only - just for completeness)
const logoutUser = (req, res) => {
  // JWT is stateless, so no server-side logout is necessary
  // The client should delete the token
  res.json({ message: 'Logged out successfully' });
};

// Export all functions
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  refreshToken,
  logoutUser,
};