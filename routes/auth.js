const router = require('express').Router();
const { celebrate } = require('celebrate');
const { validationModel } = require('../constants/validation');
const { login, createUser, logout } = require('../controllers/users');

router.post('/signup', celebrate({
  body: validationModel.user,
}), createUser);

router.post('/signin', celebrate({
  body: {
    email: validationModel.user.email,
    password: validationModel.user.password,
  },
}), login);

router.post('/logout', logout);

module.exports = router;
