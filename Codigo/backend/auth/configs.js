require("dotenv").config();

module.exports = {
  LOGIN_EXPIRATION_TIME: 604800, //* 7 dias
  ALGORITHM: "HS256",
  SECRET_KEY: process.env.SECRET_KEY,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_SENDER: process.env.EMAIL_SENDER,
};
