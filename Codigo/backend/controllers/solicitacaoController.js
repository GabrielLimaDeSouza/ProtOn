const { Paciente: PacienteModel } = require('../models/Paciente')
const { Dentista: DentistaModel } = require('../models/Dentista')

const solicitacaoController = {
    solicitacoes: async (req, res) => {
        try {
            const cpf = req.params.cpf

            const paciente = await (await PacienteModel.findOne({ cpf }).populate({ path: 'solicitacoes', select: 'name user' })).populate({ path: 'solicitacoes.user', select: 'email' })

            if (!paciente) {
                res.status(404).json({ msg: 'Paciente não encontrado!' })
                return
            }

            res.status(201).json(paciente.solicitacoes)
        } catch (error) {
        console.log(error)
        }
    },
    enviarSolicitacao: async (req, res) => {
        try {
            const cpf = req.params.cpf
            const { dentista } = req.body
            console.log(dentista)
            const updatedPaciente = await PacienteModel.findOne({ cpf })
            if (!updatedPaciente) {
                res.status(404).json({ msg: 'Paciente não encontrado!' })
                return
            }

            const dentistaObj = await DentistaModel.findById(dentista)
            if (!dentistaObj) {
                res.status(404).json({ msg: 'Dentista não encontrado!' })
                return
            }

            const solicitacaoFound = updatedPaciente.solicitacoes.find(solicitacao => solicitacao.toString() === dentista)
            if (solicitacaoFound) {
                res.status(404).json({ msg: 'Solicitação já enviada!' })
                return
            }

            const dentistaFound = updatedPaciente.dentistas.find(dentistaA => dentistaA.toString() === dentista)
            if (dentistaFound) {
                res.status(404).json({ msg: 'Solicitação já aceita!' })
                return
            }

            updatedPaciente.solicitacoes.push(dentista)
            updatedPaciente.save()

            res.status(201).json({ msg: 'Solicitação enviada' })
        } catch (error) {
        console.log(error)
        }
    },
    aceitarSolicitacao: async (req, res) => {
        try {
            const cpf = req.params.cpf
            const { dentista } = req.body

            const updatedPaciente = await PacienteModel.findOne({ cpf })
            if (!updatedPaciente) {
                res.status(404).json({ msg: 'Paciente não encontrado!' })
                return
            }

            const dentistaObj = await DentistaModel.findById(dentista)
            if (!dentistaObj) {
                res.status(404).json({ msg: 'Dentista não encontrado!' })
                return
            }

            const solicitacaoFound = updatedPaciente.solicitacoes.find(solicitacao => solicitacao.toString() === dentista)
            if (!solicitacaoFound) {
                res.status(404).json({ msg: 'Solicitação não encontrada!' })
                return
            }

            const dentistaFound = updatedPaciente.dentistas.find(dentistaA => dentistaA.toString() === dentista)
            if (dentistaFound) {
                res.status(404).json({ msg: 'Solicitação de dentista já aceita!' })
                return
            }

            updatedPaciente.solicitacoes = updatedPaciente.solicitacoes.filter(solicitacao => solicitacao.toString() !== dentista)

            updatedPaciente.dentistas.push(dentista)
            updatedPaciente.save()

            res.status(201).json({ msg: 'Solicitação aceita' })
        } catch (error) {
            console.log(error)
        }
    },
    recusarSolicitacao: async (req, res) => {
        try {
            const cpf = req.params.cpf
            const dentista = req.params.id

            const updatedPaciente = await PacienteModel.findOne({ cpf })
            if (!updatedPaciente) {
                res.status(404).json({ msg: 'Paciente não encontrado!' })
                return
            }

            const dentistaObj = await DentistaModel.findById(dentista)
            if (!dentistaObj) {
                res.status(404).json({ msg: 'Dentista não encontrado!' })
                return
            }

            const solicitacaoFound = updatedPaciente.solicitacoes.find(solicitacao => solicitacao.toString() === dentista)
            if (!solicitacaoFound) {
                res.status(404).json({ msg: 'Solicitação não encontrada!' })
                return
            }

            updatedPaciente.solicitacoes = updatedPaciente.solicitacoes.filter(solicitacao => solicitacao.toString() !== dentista)

            updatedPaciente.save()

            res.status(201).json({ msg: 'Solicitação recusada' })
        } catch (error) {
        console.log(error)
        }
    },
}

module.exports = solicitacaoController
