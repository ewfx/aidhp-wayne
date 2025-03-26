const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  type: {
    type: String,
    enum: ['individual', 'organization'],
    required: true,
  },
  // Fields for individuals
  age: {
    type: Number,
    required: function () {
      return this.type === 'individual';
    },
  },
  interests: {
    type: String,
    required: function () {
      return this.type === 'individual';
    },
  },
  income: {
    type: String,
    required: function () {
      return this.type === 'individual';
    },
  },
  // Fields for organizations
  industry: {
    type: String,
    required: function () {
      return this.type === 'organization';
    },
  },
  financialNeeds: {
    type: String,
    required: function () {
      return this.type === 'organization';
    },
  },
  revenues: {
    type: String,
    required: function () {
      return this.type === 'organization';
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);