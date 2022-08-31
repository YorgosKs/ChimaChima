const router = require('express').Router();
const Transaction = require('../models/transactions.model');
const auth = require('../auth/auth');

router.post('/add', auth, async (req, res) => {
  const transaction = new Transaction({
    user: req.user.id,
    date: req.body.date,
    amount: req.body.amount,
    description: req.body.description,
    wallet: req.body.wallet,
  });

  try {
    const newTransaction = await transaction.save();
    res.send(transaction);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.get('/all', auth, async (req, res) => {
  Transaction.find({ user: req.user.id })
    .then((transaction) => res.json(transaction))
    .catch((err) => res.status(400).send('Error: ' + err));
});

router.post('/update/:id', auth, async (req, res) => {
  Transaction.findById(req.params.id).then((transaction) => {
    (transaction.date = req.body.date),
      (transaction.amount = req.body.amount),
      (transaction.description = req.body.description),
      (transaction.wallet = req.body.wallet),
      transaction
        .save()
        .then(() => res.json('Transaction updated! ' + req.params.id))
        .catch((err) => res.status(400).json('Error: ' + err));
  });
});

router.delete('/delete/:id', auth, async (req, res) => {
  Transaction.findByIdAndDelete(req.params.id)
    .then(() => res.json('transaction deleted ' + req.params.id))
    .catch((err) => res.status(400).json('Error: ' + err));
});
module.exports = router;
