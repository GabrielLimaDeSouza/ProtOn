const { ObjectId } = require('mongodb')
const { Dentista: DentistaModel } = require("../models/Dentista")
const { Usuario: UsuarioModel } = require("../models/Usuario")

const dentistaController = {
    create: async (req, res) => {
        try {
            const { name, email, senha, matricula, instituicao } = req.body

            const dentista = {
                name,
                matricula,
                instituicao
            }
            const user = await DentistaModel.create(dentista)

            const usuarioDentista = {
                email,
                senha,
                type: 'dentista',
                user: user._id
            }
            
            const response = await UsuarioModel.create(usuarioDentista)

            res.status(201).json({ response, msg: "Dentista cadastrado com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const dentistas = await DentistaModel.find().populate("instituicao")

            res.status(201).json(dentistas)
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res)=> {
        try {
            const id = req.query.id
            const dentista = await DentistaModel.findById(id).populate("instituicao")

            if(!dentista) {
                res.status(404).json({ msg: "Usuário não encontrado!" })
                return
            }

            res.status(201).json(dentista)
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.query.id

            await UsuarioModel.findOneAndDelete({ user: id })
            const deletedDentista = await DentistaModel.findByIdAndDelete(id)

            res.status(200).json({ deletedDentista, msg: "Usuário excluido com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.query.id
            const { name, email, senha } = req.body

            const updatedDentista = await DentistaModel.findByIdAndUpdate(id, { name })

            if(!updatedDentista) {
                res.status(404).json({ msg: "Usuário não encontrado!" })
                return
            }

            const response = await UsuarioModel.findOneAndUpdate({ user: id }, { email, senha })
            response.populate("user")

            res.status(200).json({ response, msg: "Usuário atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = dentistaController