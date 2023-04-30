const Token = require('../auth/token.auth')
const { LOGIN_EXPIRATION_TIME } = require('../auth/configs')
const { Usuario: UsuarioModel } = require("../models/Usuario")

const loginController = {
    login: async (req, res) => {
        try {
            const { email, senha } = req.body
            const user = await UsuarioModel.findOne({ email })

            if(!user) {
                res.status(404).json({ msg: `Usuário não encontrado!` })
                return
            }

            if(senha !== user.senha) {
                res.status(401).json({ msg: `Senha incorreta` })
                return
            }

            const JWTData = {
                exp: Math.floor(Date.now() / 1000) + LOGIN_EXPIRATION_TIME,
                sub: user._id,
                iss: 'proton',
                data: {
                    _id: user._id,
                },
            }

            const token = await Token.generate(JWTData)

            res.status(201).json({ email, _id: user._id, token })
        } catch (error) {
            console.log(error)
        }
    },
    logout: async (req, res) => {
            try {
                const cpf = req.params.cpf
                const paciente = await UsuarioModel.findOne({ cpf: cpf }).exec()
    
                if(!paciente) {
                    res.status(404).json({ msg: `Paciente com cpf ${cpf} não encontrado!` })
                    return
                }
    
                res.status(201).json(paciente)
            } catch (error) {
                console.log(error)
            }
    }
}

module.exports = loginController