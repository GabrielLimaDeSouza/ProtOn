const { Dentista: DentistaModel } = require("../models/Dentista")
const { Usuario: UsuarioModel } = require("../models/Usuario")

const dentistaController = {
    create: async (req, res) => {
        try {
            const { name, email, senha, matricula } = req.body

            const user = {
                email,
                senha,
                type: 'dentista',
            }
            const responseUser = await UsuarioModel.create(user)
            
            const dentistaObject = {
                name,
                matricula,
                user: responseUser._id
            }
            const dentista = await (await DentistaModel.create(dentistaObject)).populate('user')

            return dentista
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const dentistas = await DentistaModel.find().populate('user')

            res.status(201).json(dentistas)
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res)=> {
        try {
            const id = req.query.id
            const dentista = await DentistaModel.findById(id).populate('user')

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

            const dentista = await DentistaModel.findByIdAndDelete(id)
            await UsuarioModel.findByIdAndDelete(dentista.user._id)

            res.status(200).json({ dentista, msg: "Usuário excluido com sucesso!" })
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

            await UsuarioModel.findByIdAndUpdate(updatedDentista.user._id, { email, senha })

            const dentista = await updatedDentista.populate("user")

            res.status(200).json({ dentista, msg: "Usuário atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = dentistaController