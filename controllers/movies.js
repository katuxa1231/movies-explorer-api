const Movie = require('../models/movie');
const { errorMessage, StatusCode } = require('../constants/api');
const BadRequest = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden');

module.exports.getMovies = (req, res, next) => {
  Movie.find({}).sort({ createAt: -1 })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    thumbnail,
    movieId,
    trailerLink: trailer,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ _id: req.params.movieId })
    .then((movie) => {
      if (!movie) {
        throw new Forbidden(errorMessage[StatusCode.FORBIDDEN]);
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new BadRequest('Фильм может быть удален только влдельцем');
      }
      movie.remove()
        .then((deletedMovie) => res.send(deletedMovie))
        .catch(next);
    })
    .catch(next);
};
