const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  wallet: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
