const express = require('express');
const authenticateToken = require('../middleware/validatetoken');
const {
  registerUser,
  loginUser,
  getUserProfile,
  refreshToken,
  logoutUser,
} = require('../controller/userController');

const router = express.Router();

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getUserProfile);
router.post('/refresh-token', authenticateToken, refreshToken);
router.post('/logout', logoutUser);

module.exports = router;