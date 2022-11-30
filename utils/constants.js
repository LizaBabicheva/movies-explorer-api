const urlRegEx = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;
const numRegEx = /^\d+$/;
const emailRegEx = /^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+\.[a-z]+$/;

module.exports = {
  urlRegEx,
  numRegEx,
  emailRegEx,
};
