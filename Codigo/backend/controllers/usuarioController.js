const { Usuario: UsuarioModel } = require("../models/Usuario")
const { Dentista: DentistaModel } = require("../models/Dentista")
const { Paciente: PacienteModel } = require("../models/Paciente")
const { Instituicao: InstituicaoModel } = require("../models/Instituicao")

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

const usuarioController = {
    get: async (req, res) => {
        try {
            const _id = req.query.id
            const user = await UsuarioModel.findById(_id)

            if(!user) {
                res.status(404).json({ msg: `Usuario ${ _id } não encontrado!` })
                return
            }

            let userType = data = null

            switch (user.type) {
                case 'dentista':
                    userType = await DentistaModel.findOne({ user: user._id })
                    data = await userType.populate('pacientes')
                    break;

                case 'paciente':
                    userType = await PacienteModel.findOne({ user: user._id })
                    data = await userType.populate('condicoes')
                    break;

                case 'instituicao':
                    userType = await InstituicaoModel.findOne({ user: user._id })
                    data = await userType.populate('dentistas')
                    break;

                default:
                    res.status(500).json({ msg: `Usuario ${ user.type } de ${ _id } não encontrado!` })
                    return
            }

            data = await data.populate('user')
            
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