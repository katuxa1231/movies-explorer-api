const { Joi } = require('celebrate');
const mongoose = require('mongoose');

const linkRegExp = /https?:\/\/(www.)?[\w-]*\.\w\/?[\w\-._~:/?#[\]@!$&'()*+,;=]*/i;
const enRegExp = /^[a-z0-9 -]+$/i;
const ruRegExp = /^[а-яё0-9 -]+$/i;
const customIdValidation = Joi.string().custom((value, helpers) => {
  if (!mongoose.isObjectIdOrHexString(value)) {
    return helpers.message('Значение Id невалидно');
  }
  return value;
});

const validationModel = {
  user: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  },
  movie: {
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(linkRegExp),
    trailerLink: Joi.string().required().regex(linkRegExp),
    thumbnail: Joi.string().required().regex(linkRegExp),
    movieId: Joi.number().required(),
  },
};

const validationParam = {
  id: customIdValidation,
  movieId: Joi.number(),
};

module.exports = {
  validationModel, validationParam, linkRegExp, enRegExp, ruRegExp,
};
