const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  uname: {
    type: String,
    default: 'user',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
