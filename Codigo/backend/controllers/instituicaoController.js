const { Instituicao: InstituicaoModel } = require("../models/Instituicao")
const { Usuario: UsuarioModel } = require("../models/Usuario")
const { Dentista: DentistaModel } = require("../models/Dentista")

const instituicaoController = {
    create: async (req, res) => {
        try {
            const { name, email, senha, tipo } = req.body

            const user = await InstituicaoModel.create({ name, tipo })

            const usuarioInstituicao = {
                email,
                senha,
                type: 'instituicao',
                user: user._id
            }

            const response = await UsuarioModel.create(usuarioInstituicao)
            res.status(201).json({ response, msg: "Instituicao cadastrada com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res)=> {
        try {
            const id = req.query.id
            const instituicao = await InstituicaoModel.findById(id)

            if(!instituicao) {
                res.status(404).json({ msg: "Instituição não encontrada!" })
                return
            }

            res.status(201).json(instituicao)
        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const instituicoes = await InstituicaoModel.find()

            res.status(201).json(instituicoes)
        } catch (error) {
            console.log(error)
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

            const dentistas = await UsuarioModel.find({ user: { $in: instituicao.dentistas } })
                .populate({ path: 'user', model: 'Dentista' })
                .exec()

            res.status(200).json(dentistas)
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Erro interno do servidor' })
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.query.id

            const deletedInstituicao = await InstituicaoModel.findByIdAndDelete(id)
            await UsuarioModel.findOneAndDelete({ user: id })

            res.status(200).json({ deletedInstituicao, msg: "Instituição excluida com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.query.id
            const { email, senha, tipo } = req.body

            const updatedInstituicao = await InstituicaoModel.findByIdAndUpdate(id, { tipo })
            
            if(!updatedInstituicao) {
                res.status(404).json({ msg: "Instituição não encontrada!" })
                return
            }

            const response = await UsuarioModel.findOneAndUpdate({ user: id }, { email, senha })
            response.populate("user")

            res.status(200).json({ response, msg: "Instituição atualizada com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = instituicaoController