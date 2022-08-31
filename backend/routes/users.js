const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/register', async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    uname: req.body.uname,
  });
  try {
    const newUser = await user.save();
    res.json({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  if (email !== '' && pass !== '') {
    const user = await User.findOne({ email: email });
    if (!user) return res.json(401);
    const validPass = await bcrypt.compare(pass, user.password);
    if (!validPass) return res.status(403);
    else {
      const payload = { _id: user._id };
      const token = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        (err, token) => {
          if (err) return res.json({ message: err });
          return res
            .cookie('token', token, {
              // domain: 'http://127.0.0.1:5500',
              // path: '/',
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000,
              // sameSite: 'none',
              // secure: true,
            })
            .status(200)
            .json({ message: 'Login success! ' + token });
        }
      );
    }
  } else {
    return res.json('empty mail or password');
  }
});

module.exports = router;
