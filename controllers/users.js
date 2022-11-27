const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');

// # возвращает информацию о пользователе (email и имя)
// GET /users/me
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      // const userWithoutPassword = user.toObject();
      // delete userWithoutPassword.password;
      // res.send(userWithoutPassword);
      res.send({ data: { email: user.email, name: user.name } });
    })
    .catch((next));
};

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
        return;
      }
      next(err);
    });
};