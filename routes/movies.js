const routerMovies = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const { urlRegEx, numRegEx } = require('../utils/constants');

routerMovies.get('/movies', getMovies);

routerMovies.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required().pattern(numRegEx),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegEx),
    trailerLink: Joi.string().required().pattern(urlRegEx),
    thumbnail: Joi.string().required().pattern(urlRegEx),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

routerMovies.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
}), deleteMovie);

module.exports = routerMovies;
