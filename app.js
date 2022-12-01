const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
// const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { limiter } = require('./utils/limiter');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./utils/errorHandler');
// const { corsOptions } = require('./utils/corsOptions');

const { PORT = 3000 } = process.env;
const app = express();

// app.use(cors(corsOptions));

// app.options('*', cors());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

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
