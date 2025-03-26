const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Transactions', transactionSchema);