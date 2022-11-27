const routerMovies = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies
routerMovies.get('/movies', getMovies);

// # создаёт фильм с переданными в теле
// POST /movies
routerMovies.post('/movies', createMovie);

// # удаляет сохранённый фильм по id
// DELETE /movies/_id
routerMovies.delete('/movies/:movieId', deleteMovie);

module.exports = routerMovies;
