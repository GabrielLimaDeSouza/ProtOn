const { Paciente: PacienteModel } = require("../models/paciente")

const pacienteController = {
    create: async (req, res) => {
        try {
            const { name, cpf, email, senha, condicoes } = req.body

            const paciente = {
                name,
                cpf,
                email,
                senha,
                condicoes
            }

            const response = await PacienteModel.create(paciente);
            res.status(201).json({ response, msg: "Paciente cadastrado com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res)=> {
        try {
            const id = req.query.id
            const paciente = await PacienteModel.findById(id)

            if(!paciente) {
                res.status(404).json({ msg: "Paciente não encontrado!" })
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
                email,
                senha,
                condicoes
            }

            const updatedpaciente = await PacienteModel.findByIdAndUpdate(id, paciente)

            if(!updatedpaciente) {
                res.status(404).json({ msg: "Paciente não encontrado!" })
                return
            }

            res.status(200).json({ paciente, msg: "Paciente atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = pacienteController