const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'Некорректная ссылка',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'Некорректная ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isAlphanumeric(v, 'ru-RU');
      },
      message: 'Название должно быть на русском языке',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: validator.isAlphanumeric,
      message: 'Название должно быть на английском языке',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
