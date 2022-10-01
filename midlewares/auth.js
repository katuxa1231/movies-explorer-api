const jwt = require('jsonwebtoken');
const { DEV_SECRET, COOKIE_KEY_NAME } = require('../constants/keys');
const { StatusCode, errorMessage } = require('../constants/api');
const Unauthorized = require('../errors/unauthorized');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  let payload;

  try {
    payload = jwt.verify(req.cookies[COOKIE_KEY_NAME], NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET, {}, null);
  } catch (err) {
    next(new Unauthorized(errorMessage[StatusCode.UNAUTHORIZED]));
    return;
  }

  req.user = payload;

  next();
};
