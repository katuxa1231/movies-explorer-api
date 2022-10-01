const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  updateUser, getCurrentUser,
} = require('../controllers/users');
const { validationModel } = require('../constants/validation');

router.get('/me', getCurrentUser);
router.patch('/me', celebrate({
  body: {
    name: validationModel.user.name,
    email: validationModel.user.email,
  },
}), updateUser);

module.exports = router;
