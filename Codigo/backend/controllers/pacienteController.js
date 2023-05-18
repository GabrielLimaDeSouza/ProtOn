const { Paciente: PacienteModel } = require("../models/Paciente")
const { Usuario: UsuarioModel } = require("../models/Usuario")

const pacienteController = {
    create: async (req, res) => {
        try {
            const { name, cpf, email, senha, condicoes } = req.body
            
            const user = {
                email,
                senha,
                type: 'paciente',
            }
            const responseUser = await UsuarioModel.create(user)

            const pacienteObject = {
                name,
                cpf,
                condicoes,
                user: responseUser._id,
            }
            const paciente = await (await PacienteModel.create(pacienteObject).populate('user')).populate('condicoes')

            res.status(201).json({ paciente, msg: "Paciente cadastrado com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res) => {
        try {
            const id = req.query.id
            const paciente = await PacienteModel.findById(id).populate('user').populate('condicoes')

            if(!paciente) {
                res.status(404).json({ msg: `Paciente ${id} não encontrado!` })
                return
            }

            res.status(201).json(paciente)
        } catch (error) {
            console.log(error)
        }
    },
    getByCpf: async (req, res) => {
        try {
            const cpf = req.params.cpf
            const paciente = await PacienteModel.findOne({ cpf: cpf }).populate('user').populate('condicoes').exec()

            if(!paciente) {
                res.status(404).json({ msg: `Paciente com cpf ${ cpf } não encontrado!` })
                return
            }

            res.status(201).json(paciente)
        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const pacientes = await PacienteModel.find().populate('user').populate('condicoes')

            res.status(201).json(pacientes)
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.query.id

            const paciente = await PacienteModel.findByIdAndDelete(id)
            await UsuarioModel.findByIdAndDelete(paciente.user._id)

            res.status(200).json({ paciente, msg: "Paciente excluido com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const _id = req.query.id
            const { name, email, senha, condicoes } = req.body

            const updatedPaciente = await PacienteModel.findByIdAndUpdate(_id, { name, condicoes })
            
            if(!updatedPaciente) {
                res.status(404).json({ msg: "Paciente não encontrado!" })
                return
            }

            await UsuarioModel.findByIdAndUpdate(updatedPaciente.user._id, { email, senha })

            const paciente = await (await updatedPaciente.populate('user')).populate('condicoes')

            res.status(200).json({ paciente, msg: "Paciente atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    },
    dentistas: async (req, res) => {
        try {
            const _id = req.params.id

            const updatedPaciente = await (await PacienteModel.findById(_id).populate({ path: 'dentistas', select: 'name user' })).populate({ path: 'dentistas.user', select: 'email' })
            
            if(!updatedPaciente) {
                res.status(404).json({ msg: "Paciente não encontrado!" })
                return
            }

            const dentistas = updatedPaciente.dentistas

            res.status(200).json({ dentistas })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = pacienteController