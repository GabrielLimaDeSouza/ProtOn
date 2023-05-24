const dentistaController = require("./dentistaController")
const { Instituicao: InstituicaoModel } = require("../models/Instituicao")
const { Usuario: UsuarioModel } = require("../models/Usuario")

const instituicaoController = {
    create: async (req, res) => {
        try {
            const { name, email, senha, tipo } = req.body

            const instituicaoObject = {
                name,
                tipo,
            }
            const instituicao = await InstituicaoModel.create(instituicaoObject)

            const user = {
                email,
                senha,
                type: 'Instituicao',
                user: instituicao._id
            }
            const instituicaoUser = await UsuarioModel.create(user)

            res.status(201).json({ instituicaoUser, msg: "Instituicao cadastrada com sucesso!" })
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao cadastrar a instituição!" })
        }
    },
    createDentista: async (req, res) => {
        try {
            const _id = req.params.id
            const dentista = await dentistaController.create(req, res)
            
            const instituicao = await InstituicaoModel.findById(_id)
            instituicao.dentistas.push(dentista._id)
            await instituicao.save()

            res.status(201).json({ dentista, msg: "Dentista cadastrado com sucesso" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Ocorreu um erro ao cadastrar o Dentista!" })
        }
    },
    get: async (req, res)=> {
        try {
            const _id = req.query.id
            const instituicao = await InstituicaoModel.findById(_id).populate('dentistas')

            if(!instituicao) {
                res.status(404).json({ msg: "Instituição não encontrada!" })
                return
            }

            res.status(201).json(instituicao)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Erro interno do servidor" })
        }
    },
    getAllDentistas: async (req, res) => {
        try {
            const _id = req.params.id
            const instituicao = await InstituicaoModel.findById(_id).populate('dentistas')

            if (!instituicao) {
                res.status(404).json({ msg: 'Nenhuma Instituição encontrada' })
                return
            }

            res.status(200).json(instituicao.dentistas)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    },
    delete: async (req, res) => {
        try {
            const _id = req.query.id

            const deletedInstituicao = await UsuarioModel.findByIdAndDelete(_id).populate('user')
            await InstituicaoModel.findByIdAndDelete(deletedInstituicao.user._id)

            res.status(200).json({ deletedInstituicao, msg: "Instituição excluida com sucesso!" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Ocorreu um erro ao apagar os dados da Instituição" })
        }
    },
    update: async (req, res) => {
        try {
            const _id = req.query.id
            const { name, email, senha } = req.body

            const updatedInstituicao = await InstituicaoModel.findByIdAndUpdate(_id, { name })
            
            if(!updatedInstituicao) {
                res.status(404).json({ msg: "Instituição não encontrada!" })
                return
            }

            const instituicao = await UsuarioModel.findByIdAndUpdate(updatedInstituicao.user._id, { email, senha }, { new: true }).populate('user')

            res.status(200).json({ instituicao, msg: "Instituição atualizada com sucesso!" })

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Ocorreu um erro ao atualizar os dados da Instituição" })
        }
    }
}

module.exports = instituicaoController