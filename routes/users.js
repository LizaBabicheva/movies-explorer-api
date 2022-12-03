const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserInfo, updateUser, createUser, signin, signout,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

routerUsers.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().lowercase().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

routerUsers.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().lowercase().required().email(),
    password: Joi.string().required(),
  }),
}), signin);

routerUsers.get('/users/me', auth, getUserInfo);

routerUsers.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().lowercase().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), auth, updateUser);

routerUsers.post('/signout', auth, signout);

module.exports = routerUsers;
