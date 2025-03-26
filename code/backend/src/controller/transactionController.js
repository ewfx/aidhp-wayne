const { Transactions } = require('../models/models');

// Fetch all transactions for a particular customer
exports.getTransactionsByCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const transactions = await Transactions.find({ customerId });
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found for this customer.' });
    }
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error while fetching transactions.' });
  }
};

// Add a new transaction (optional, for testing purposes)
exports.addTransaction = async (req, res) => {
  const { customerId, productId, transactionType, category, amount, purchaseDate } = req.body;

  try {
    const newTransaction = new Transactions({
      customerId,
      productId,
      transactionType,
      category,
      amount,
      purchaseDate,
    });

    await newTransaction.save();
    res.status(201).json({ message: 'Transaction added successfully', transaction: newTransaction });
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ message: 'Server error while adding transaction.' });
  }
};