const JWT = require('jsonwebtoken')
const { ALGORITHM, SECRET_KEY } = require('./configs')

const generate = data => (
  new Promise((resolve) => {
    JWT.sign(data, SECRET_KEY, { algorithm: ALGORITHM }, (err, token) => {
      if (err) {
        console.error(err)
        throw new Error("TOKEN_ERROR")
      }

      resolve(token)
    })
  })
)

module.exports = {
  generate,
}