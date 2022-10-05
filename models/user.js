const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isLength = require('validator/lib/isLength');
const bcryptjs = require('bcryptjs');
const Unauthorized = require('../errors/unauthorized');
const { errorMessage } = require('../constants/api');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
    validate: {
      validator: (v) => isLength(v, { min: 2, max: 30 }),
      message: 'Длина имени должна быть от 2 до 30 символов',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((foundUser) => {
      if (!foundUser) {
        throw new Unauthorized(errorMessage.authorizationError);
      }

      return bcryptjs.compare(password, foundUser.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized(errorMessage.authorizationError);
          }

          const user = foundUser.toObject();
          delete user.password;
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
