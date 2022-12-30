const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const {
  badReqErrMessage,
  emailConflictErrMessage,
  authSuccessful,
  signoutMessage,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      const userWithNameAndEmail = user.toObject();
      delete userWithNameAndEmail.password;
      // delete userWithNameAndEmail._id;
      res.send(userWithNameAndEmail);
    })
    .catch((next));
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(emailConflictErrMessage));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badReqErrMessage));
        return;
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(emailConflictErrMessage));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badReqErrMessage));
        return;
      }
      next(err);
    });
};

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(200)
        .cookie('authorization', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
        .send({ message: authSuccessful });
    })
    .catch(next);
};

module.exports.signout = (req, res) => {
  res.clearCookie('authorization').send({ message: signoutMessage });
};
