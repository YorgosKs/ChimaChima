const router = require('express').Router();
const Wallet = require('../models/wallet.model');
const auth = require('../auth/auth');

router.post('/add', auth, async (req, res) => {
  const wallet = new Wallet({
    user: req.user.id,
    last_update: req.body.last_update,
    type: req.body.type,
    name: req.body.name,
    balance: req.body.balance,
  });

  try {
    const newWallet = await wallet.save();
    res.send(wallet);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.get('/all', auth, async (req, res) => {
  Wallet.find({ user: req.user.id })
    .then((wallet) => res.json(wallet))
    .catch((err) => res.status(400).send('Error: ' + err));
});

router.post('/update/:id', auth, async (req, res) => {
  Wallet.findById(req.params.id).then((wallet) => {
    (wallet.last_update = req.body.last_update),
      (wallet.type = req.body.type),
      (wallet.name = req.body.name),
      (wallet.balance = req.body.balance),
      wallet
        .save()
        .then(() => res.json('Wallet updated! ' + req.params.id))
        .catch((err) => res.status(400).json('Error: ' + err));
  });
});

router.delete('/delete/:id', auth, async (req, res) => {
  Wallet.findByIdAndDelete(req.params.id)
    .then(() => res.json('Wallet deleted ' + req.params.id))
    .catch((err) => res.status(400).json('Error: ' + err));
});
module.exports = router;
