require('dotenv').config()

module.exports = {
    LOGIN_EXPIRATION_TIME: 3600,
    ALGORITHM: 'HS256',
    SECRET_KEY: process.env.SECRET_KEY
}