const express = require('express');
const { getTransactionsByCustomer, addTransaction } = require('../controller/transactionController');
const authenticateToken = require('../middleware/validatetoken');

const router = express.Router();

// Route to fetch all transactions for a particular customer
router.get('/:customerId', authenticateToken, getTransactionsByCustomer);

// Route to add a new transaction (optional, for testing purposes)
router.post('/', authenticateToken, addTransaction);

module.exports = router;