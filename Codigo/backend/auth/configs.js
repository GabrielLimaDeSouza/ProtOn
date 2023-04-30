require('dotenv').config()

module.exports = {
    LOGIN_EXPIRATION_TIME: 604800, //* 7 dias
    ALGORITHM: 'HS256',
    SECRET_KEY: process.env.SECRET_KEY
}