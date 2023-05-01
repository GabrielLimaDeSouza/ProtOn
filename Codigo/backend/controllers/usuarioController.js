const { Usuario: UsuarioModel } = require("../models/Usuario")

const usuarioController = {
    get: async (req, res) => {
        try {
            const id = req.query.id
            const user = await UsuarioModel.findById(id)

            if(!user) {
                res.status(404).json({ msg: `Usuario ${id} não encontrado!` })
                return
            }

            const data = await user.populate("user")

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