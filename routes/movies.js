const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getMovies, createMovie, deleteMovie, } = require('../controllers/movies');
const { validationModel, validationParam } = require('../constants/validation');

router.get('', getMovies);

router.post('', celebrate({
  body: validationModel.movie,
}), createMovie);

router.delete('/:movieId', celebrate({
  params: {
    movieId: validationParam.id,
  },
}), deleteMovie);

module.exports = router;
