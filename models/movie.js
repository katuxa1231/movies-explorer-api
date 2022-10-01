const mongoose = require('mongoose');
const { linkRegExp, ruRegExp, enRegExp } = require('../constants/validation');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (v) => ruRegExp.test(v),
      message: 'Неправильный формат ссылки',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (v) => enRegExp.test(v),
      message: 'Неправильный формат ссылки',
    },
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => linkRegExp.test(v),
      message: 'Некорректный URL-адрес',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => linkRegExp.test(v),
      message: 'Некорректный URL-адрес',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => linkRegExp.test(v),
      message: 'Некорректный URL-адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
