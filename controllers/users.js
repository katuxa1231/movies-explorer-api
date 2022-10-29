const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { DEV_SECRET, COOKIE_KEY_NAME } = require('../constants/keys');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const isProd = NODE_ENV === 'production';

function getToken(userId, secretKey) {
  return jwt.sign(
    { _id: userId },
    secretKey,
    { expiresIn: '7d' },
  );
}

function getCookieOptions(isProduction) {
  return {
    maxAge: 3600000 * 24 * 7,
    httpOnly: true,
    sameSite: isProduction ? 'None' : true,
    secure: isProduction,
  };
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = getToken(user._id, isProd ? JWT_SECRET : DEV_SECRET);
      res.cookie(COOKIE_KEY_NAME, token, getCookieOptions(isProd)).send({ data: user });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie(COOKIE_KEY_NAME, {
    sameSite: isProd ? 'None' : true,
    secure: isProd,
  }).send({ status: 'Successful' });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcryptjs.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((newUser) => {
      const token = getToken(newUser._id, isProd ? JWT_SECRET : DEV_SECRET);
      const user = newUser.toObject();
      delete user.password;
      res.cookie(COOKIE_KEY_NAME, token, getCookieOptions(isProd)).status(201).send({ data: user });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findOneAndUpdate({ _id: req.user._id }, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
