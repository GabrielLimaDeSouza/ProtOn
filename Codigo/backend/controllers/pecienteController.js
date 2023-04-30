const { Paciente: PacienteModel } = require("../models/Paciente")
const { Usuario: UsuarioModel } = require("../models/Usuario")

const pacienteController = {
    create: async (req, res) => {
        try {
            const { name, cpf, email, senha, condicoes } = req.body

            const user = await PacienteModel.create({ name, cpf, condicoes })

            const usuarioPaciente = {
                email,
                senha,
                user: user._id
            }

            const response = await UsuarioModel.create(usuarioPaciente)
            res.status(201).json({ response, msg: "Paciente cadastrado com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id
            const paciente = await PacienteModel.findById(id)

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
                const paciente = await PacienteModel.findOne({ cpf: cpf }).exec()
    
                if(!paciente) {
                    res.status(404).json({ msg: `Paciente com cpf ${cpf} não encontrado!` })
                    return
                }
    
                res.status(201).json(paciente)
            } catch (error) {
                console.log(error)
            }
    },
    getAll: async (req, res) => {
        try {
            const pacientes = await PacienteModel.find()

            res.status(201).json(pacientes)
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.query.id
            const paciente = await PacienteModel.findById(id)

            if(!paciente) {
                res.status(404).json({ msg: "Paciente não encontrado!" })
                return
            }

            const deletedPaciente = await PacienteModel.findByIdAndDelete(id)
            await UsuarioModel.findOneAndDelete({ user: id })

            res.status(200).json({ deletedPaciente, msg: "Paciente excluido com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.query.id
            const { name, cpf, email, senha, condicoes } = req.body

            const paciente = {
                name,
                cpf,
                condicoes
            }

            const updatedpaciente = await PacienteModel.findByIdAndUpdate(id, paciente)
            
            if(!updatedpaciente) {
                res.status(404).json({ msg: "Paciente não encontrado!" })
                return
            }

            const response = await UsuarioModel.findOneAndUpdate({ user: id }, { email, senha })
            response.populate("Paciente")

            res.status(200).json({ response, msg: "Paciente atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    },
    getByPacienteCpf: async(req, res) => {
        try {
            const cpf = req.query.cpf
            const condicoes = await PacienteModel.findOne({ cpf: cpf }).populate("condicoes").exec()

            res.status(200).json(condicoes)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = pacienteController