const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  last_update: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  balance: {
    type: String,
    required: true,
  },
});

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;
