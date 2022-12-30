const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

const logger = winston.createLogger({
  transports: [
    new (winston.transports.File)({
      filename: 'catch.log',
      level: 'error',
    }),
  ],
});

module.exports = {
  requestLogger,
  errorLogger,
  logger,
};
