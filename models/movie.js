const mongoose = require('mongoose');
const { linkRegExp } = require('../constants/validation');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
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
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
