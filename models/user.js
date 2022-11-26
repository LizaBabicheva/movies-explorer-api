const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Неправильный email',
    },
  },
  // password — хеш пароля. Обязательное поле-строка.
  // Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.
  password: {
    type: String,
    required: true,
    select: false,
  },
  // name — имя пользователя, например: Александр или Мария.
  // Это обязательное поле-строка от 2 до 30 символов.
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

// userSchema.statics.findUserByCredentials = function (email, password) {
//   return this.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         throw new UnauthorizedError('Неправильные почта или пароль');
//       }

//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             throw new UnauthorizedError('Неправильные почта или пароль');
//           }
//           return user;
//         });
//     });
// };

module.exports = mongoose.model('user', userSchema);
