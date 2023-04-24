const { ObjectId } = require('mongodb')
const { Dentista: DentistaModel } = require("../models/Dentista")

const dentistaController = {
    create: async (req, res) => {
        try {
            const { name, email, senha, matricula, instituicao } = req.body

            const dentista = {
                name,
                email,
                senha,
                matricula,
                instituicao
            }

            const response = await DentistaModel.create(dentista);

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
            const id = req.params.id
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
    getAllDentistasInstituicao: async (req, res) => {
        try {
            const _id = new ObjectId(req.query.id)
            const dentistas = await DentistaModel.find({ 'instituicao': _id })

            if(!dentistas) {
                res.status(404).json({ msg: "Nenhum dentista encontrado!" })
                return
            }

            res.status(201).json(dentistas)
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.query.id
            const dentista = await DentistaModel.findById(id)

            if(!dentista) {
                res.status(404).json({ msg: "Usuário não encontrado!" })
                return
            }

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
            
            const dentista = {
                name,
                email,
                senha
            }

            const updatedDentista = await DentistaModel.findByIdAndUpdate(id, dentista)

            if(!updatedDentista) {
                res.status(404).json({ msg: "Usuário não encontrado!" })
                return
            }

            res.status(200).json({ dentista, msg: "Usuário atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = dentistaController