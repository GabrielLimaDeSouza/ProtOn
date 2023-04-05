const { Dentista: DentistaModel } = require("../models/Dentista")

const instituicaoController = require("./instituicaoController")

const dentistaController = {
    create: async (req, res) => {
        try {
            const { name, email, senha, instituicao } = req.body

            const dentista = {
                name,
                email,
                senha,
                instituicao: {
                    nome: instituicao.nome,
                    cnpj: instituicao.cnpj
                }
            }

            instituicaoController.create(instituicao)

            const response = await DentistaModel.create(dentista);

            res.status(201).json({ response, msg: "Dentista cadastrado com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const dentistas = await DentistaModel.find()

            res.status(201).json(dentistas)
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res)=> {
        try {
            const id = req.query.id
            const dentista = await DentistaModel.findById(id)

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