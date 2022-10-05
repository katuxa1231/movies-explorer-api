const router = require('express').Router();
const { celebrate } = require('celebrate');
const { validationModel } = require('../constants/validation');
const { login, createUser } = require('../controllers/users');

router.post('/signup', celebrate({
  body: validationModel.user,
}), createUser);

router.post('/signin', celebrate({
  body: {
    email: validationModel.user.email,
    password: validationModel.user.password,
  },
}), login);

module.exports = router;
