const numRegEx = /^\d+$/;

const unauthorizedErrMessage = 'Необходима авторизация';
const badReqErrMessage = 'Переданы некорректные данные';
const forbiddenErrMessage = 'Нет прав';
const movieNotFoundErrMessage = 'Запрашиваемый фильм не найден';
const emailConflictErrMessage = '`Пользователь с указанным email уже существует`';

const movieDeletedMessage = 'Фильм удален';
const authSuccessful = 'Успешная авторизация';
const signoutMessage = 'До свидания!';
const invalidUrl = 'Некорректная ссылка';
const invalidDataType = 'Некорректный тип данных';
const invalidEmail = 'Неправильный email';
const wrongPasswordOrEmail = 'Неправильные почта или пароль';
const serverErr = 'На сервере произошла ошибка';
const pathNotFound = 'Запрашиваемый путь не найден';

const devDataBase = 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  numRegEx,
  unauthorizedErrMessage,
  badReqErrMessage,
  forbiddenErrMessage,
  movieNotFoundErrMessage,
  movieDeletedMessage,
  emailConflictErrMessage,
  authSuccessful,
  signoutMessage,
  invalidUrl,
  invalidDataType,
  invalidEmail,
  wrongPasswordOrEmail,
  serverErr,
  pathNotFound,
  devDataBase,
};
