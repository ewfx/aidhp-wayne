const express = require('express');
const authenticateToken = require('../middleware/validatetoken');
const { getAllProducts } = require('../controller/productController');

const router = express.Router();

// Product routes
router.get('/', authenticateToken, getAllProducts);

module.exports = router;