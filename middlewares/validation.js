const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const { numRegEx, invalidUrl } = require('../utils/constants');

const urlValidation = (val, helpers) => {
  if (validator.isURL(val)) {
    return val;
  }
  return helpers.message(invalidUrl);
};

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().lowercase().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const signinUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().lowercase().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().lowercase().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const postMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required().pattern(numRegEx),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidation),
    trailerLink: Joi.string().required().custom(urlValidation),
    thumbnail: Joi.string().required().custom(urlValidation),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  createUserValidation,
  signinUserValidation,
  updateUserValidation,
  postMovieValidation,
  deleteMovieValidation,
};
