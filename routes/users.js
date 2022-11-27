const routerUsers = require('express').Router();
const { getUserInfo, updateUser } = require('../controllers/users');

routerUsers.get('/users/me', getUserInfo);

routerUsers.patch('/users/me', updateUser);

module.exports = routerUsers;
