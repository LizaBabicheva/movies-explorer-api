const routerMovies = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { postMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

routerMovies.get('/movies', getMovies);

routerMovies.post('/movies', postMovieValidation, createMovie);

routerMovies.delete('/movies/:movieId', deleteMovieValidation, deleteMovie);

module.exports = routerMovies;
