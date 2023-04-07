const { Instituicao: InstituicaoModel } = require("../models/Instituicao")

const instituicaoController = {
    create: async (req, res) => {
        try {
            const { name, email, senha, tipo } = req.body

            const instituicao = {
                name,
                email,
                senha,
                tipo
            }

            const response = await InstituicaoModel.create(instituicao);
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
    delete: async (req, res) => {
        try {
            const id = req.query.id
            const instituicao = await InstituicaoModel.findById(id)

            if(!instituicao) {
                res.status(404).json({ msg: "Instituição não encontrada!" })
                return
            }

            const deletedInstituicao = await InstituicaoModel.findByIdAndDelete(id)

            res.status(200).json({ deletedInstituicao, msg: "Instituição excluida com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.query.id
            const { name, email, senha, tipo } = req.body
            
            const instituicao = {
                name,
                email,
                senha,
                tipo
            }

            const updatedInstituicao = await InstituicaoModel.findByIdAndUpdate(id, instituicao)

            if(!updatedInstituicao) {
                res.status(404).json({ msg: "Instituição não encontrada!" })
                return
            }

            res.status(200).json({ instituicao, msg: "Instituição atualizada com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = instituicaoController