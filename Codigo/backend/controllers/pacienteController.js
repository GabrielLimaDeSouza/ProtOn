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
            const paciente = await PacienteModel.create(pacienteObject)

            res.status(201).json({ paciente, msg: "Paciente cadastrado com sucesso!" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o Paciente' })
        }
    },
    get: async (req, res) => {
        try {
            const id = req.query.id
            const paciente = await PacienteModel
                .findById(id)
                .populate('user')
                .populate('condicoes')

            if(!paciente) {
                res.status(404).json({ msg: `Paciente ${id} não encontrado!` })
                return
            }

            res.status(201).json(paciente)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    },
    getByCpf: async (req, res) => {
        try {
            const cpf = req.params.cpf
            const { dentista } = req.body

            const paciente = await PacienteModel
                .findOne({ cpf })
                .populate('user condicoes')

            if(!paciente) {
                res.status(404).json({ msg: `Paciente com cpf ${ cpf } não encontrado!` })
                return
            }

            const acesso = paciente.dentistas.find(dentista1 => dentista1 === dentista)
            if(!acesso) {
                res.status(401).json({ msg: 'Dentista sem permição' })
                return
            }

            res.status(201).json(paciente)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    },
    getAll: async (req, res) => {
        try {
            const pacientes = await PacienteModel
                .find()
                .populate('user condicoes')

            res.status(201).json(pacientes)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor' })
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
            res.status(500).json({ error: 'Ocorreu um erro ao apagar os dados do Paciente' })
        }
    },
    update: async (req, res) => {
        try {
            const _id = req.query.id
            const { name, email, senha, condicoes } = req.body

            const updatedPaciente = await PacienteModel
                .findByIdAndUpdate(_id, {
                    name,
                    condicoes
                }, { new: true })
            
            if(!updatedPaciente) {
                res.status(404).json({ msg: "Paciente não encontrado!" })
                return
            }

            await UsuarioModel.findByIdAndUpdate(updatedPaciente.user._id, { email, senha })

            const paciente = await updatedPaciente
            .populate({
                path: 'user',
                populate: {
                    path: 'condicoes'
                }
            })

            res.status(200).json({ paciente, msg: "Paciente atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Ocorreu um erro ao atualizar os dados do Paciente' })
        }
    },
    dentistas: async (req, res) => {
        try {
            const _id = req.params.id

            const paciente = await PacienteModel
            .findById(_id)
            .populate({
                path: 'dentistas',
                select: 'name user',
                populate: {
                    path: 'user',
                    select: 'email'
                }
            })
            
            if(!paciente) {
                res.status(404).json({ msg: "Paciente não encontrado!" })
                return
            }

            res.status(200).json({ dentistas: paciente.dentistas })

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }
}

module.exports = pacienteController