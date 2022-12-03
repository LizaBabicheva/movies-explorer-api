const urlRegEx = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;
const numRegEx = /^\d+$/;
const emailRegEx = /^[a-zA-Z0-9_.]+[@]{1}[a-zA-Z0-9]+\.[a-zA-Z]+$/;

const unauthorizedErrMessage = 'Необходима авторизация';
const badReqErrMessage = 'Переданы некорректные данные';
const forbiddenErrMessage = 'Нет прав';
const movieNotFoundErrMessage = 'Запрашиваемый фильм не найден';
const emailConflictErrMessage = '`Пользователь с указанным email уже существует`';

const movieDeletedMessage = 'Фильм удален';
const authSuccessful = 'Успешная авторизация';
const signoutMessage = 'До свидания!';

const devDataBase = 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  urlRegEx,
  numRegEx,
  emailRegEx,
  unauthorizedErrMessage,
  badReqErrMessage,
  forbiddenErrMessage,
  movieNotFoundErrMessage,
  movieDeletedMessage,
  emailConflictErrMessage,
  authSuccessful,
  signoutMessage,
  devDataBase,
};
