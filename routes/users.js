const routerUsers = require('express').Router();
const {
  getUserInfo, updateUser, createUser, signin, signout,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

const { createUserValidation, signinUserValidation, updateUserValidation } = require('../middlewares/validation');

routerUsers.post('/signup', createUserValidation, createUser);

routerUsers.post('/signin', signinUserValidation, signin);

routerUsers.get('/users/me', auth, getUserInfo);

routerUsers.patch('/users/me', updateUserValidation, auth, updateUser);

routerUsers.post('/signout', auth, signout);

module.exports = routerUsers;
