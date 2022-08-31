const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
var cookieParser = require('cookie-parser');

// EXPRESS INIT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to ${port}`);
});

//  DB INIT
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongo connected successfully!');
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

// ROUTES
const userRoute = require('./routes/users');
const transRoute = require('./routes/transactions');
const walletRoute = require('./routes/wallets');

// MIDDLEWARE
app.use('/api/users', userRoute);
app.use('/api/transactions', transRoute);
app.use('/api/wallet', walletRoute);
