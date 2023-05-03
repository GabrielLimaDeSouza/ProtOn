const { Usuario: UsuarioModel } = require("../models/Usuario")

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

const usuarioController = {
    get: async (req, res) => {
        try {
            const _id = req.query.id
            const user = await UsuarioModel.findOne({ user: _id })

            if(!user) {
                res.status(404).json({ msg: `Usuario ${ _id } não encontrado!` })
                return
            }

            const data = await user.populate({ path: 'user', model: capitalizeFirstLetter(user.type) })

            res.status(201).json(data)
        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const users = await UsuarioModel.find()

            res.status(201).json(users)
        } catch (error) {
            console.log(error)
        }
    },
}

module.exports = usuarioController