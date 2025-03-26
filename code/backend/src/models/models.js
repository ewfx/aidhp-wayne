const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');
const Transactions = require('./Transactions'); // Import the Transaction schema

module.exports = {
  User,
  Product,
  Transactions, // Export the Transaction model
};