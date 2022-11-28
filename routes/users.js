const routerUsers = require('express').Router();
const {
  getUserInfo, updateUser, createUser, signin, signout,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

routerUsers.post('/signup', createUser);

routerUsers.post('/signin', signin);

routerUsers.get('/users/me', auth, getUserInfo);

routerUsers.patch('/users/me', auth, updateUser);

routerUsers.post('/signout', auth, signout);

module.exports = routerUsers;
