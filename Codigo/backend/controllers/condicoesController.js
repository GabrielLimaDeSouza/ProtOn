const { Condicoes: CondicoesModel } = require("../models/Consdicoes")

const pacienteController = {
    get: async (req, res)=> {
        try {
            const id = req.query.id
            const condicao = await CondicoesModel.findById(id)

            if(!condicao) {
                res.status(404).json({ msg: "Condição não encontrada!" })
                return
            }

            res.status(201).json(condicao)
        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const condicoes = await CondicoesModel.find()

            res.status(201).json(condicoes)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = pacienteController