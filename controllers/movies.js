const Movie = require('../models/movie');
const { errorMessage, StatusCode } = require('../constants/api');
const Forbidden = require('../errors/forbidden');
const NotFound = require('../errors/not-found');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
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
        throw new NotFound(errorMessage[StatusCode.NOT_FOUND]);
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new Forbidden(errorMessage.forbidden.deleteFilm);
      }
      movie.remove()
        .then((deletedMovie) => res.send(deletedMovie))
        .catch(next);
    })
    .catch(next);
};
