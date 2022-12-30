const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const {
  badReqErrMessage,
  forbiddenErrMessage,
  movieNotFoundErrMessage,
  movieDeletedMessage,
} = require('../utils/constants');
const { logger } = require('../middlewares/logger');

module.exports.getMovies = (req, res, next) => {
  Movie.find({
    where: { owner: req.user.id },
  })
    .then((movies) => res.send({ movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      logger.error('EXCEPTION!!!!');
      logger.error(err);
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badReqErrMessage));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFoundErrMessage);
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError(forbiddenErrMessage);
      }
      return movie.remove();
    })
    .then(() => {
      res.status(200).send({ message: movieDeletedMessage });
    })
    .catch((err) => {
      logger.error('ОШИБКА!!!!');
      logger.error(err);
      if (err.name === 'CastError') {
        next(new BadRequestError(badReqErrMessage));
        return;
      }
      next(err);
    });
};
