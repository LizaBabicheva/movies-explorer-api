const express = require('express');
// require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./utils/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors({
  // origin: ['http://mesto.lizababicheva.nomoredomains.icu',
  //   'https://mesto.lizababicheva.nomoredomains.icu'],
  credentials: true,
}));

app.options('*', cors());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(requestLogger);

app.use(routerUsers);
app.use('/', auth, routerMovies);

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый путь не найден');
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
