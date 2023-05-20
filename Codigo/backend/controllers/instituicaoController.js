const dentistaController = require("./dentistaController")
const { Instituicao: InstituicaoModel } = require("../models/Instituicao")
const { Usuario: UsuarioModel } = require("../models/Usuario")

const instituicaoController = {
    create: async (req, res) => {
        try {
            const { name, email, senha, tipo } = req.body

            const user = {
                email,
                senha,
                type: 'instituicao',
            }
            const responseUser = await UsuarioModel.create(user)
            
            const instituicaoObject = {
                name,
                tipo,
                user: responseUser._id
            }
            const instituicao = await (await InstituicaoModel.create(instituicaoObject)).populate('user')

            res.status(201).json({ instituicao, msg: "Instituicao cadastrada com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    createDentista: async (req, res) => {
        try {
          const _id = req.params.id;
          const instituicao = await InstituicaoModel.findById(_id);
          const instituicaoId = instituicao._id;
          const dentista = await dentistaController.create(req, res, instituicaoId);
          instituicao.dentistas.push(dentista._id);
          await instituicao.save();
          res.status(201).json({ dentista, msg: "Dentista cadastrada com sucesso!" });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Ocorreu um erro ao criar o dentista." });
        }
      },
      
    get: async (req, res)=> {
        try {
            const id = req.query.id
            const instituicao = await InstituicaoModel.findById(id).populate('user').populate('dentistas')

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
            const instituicoes = await InstituicaoModel.find().populate('user').populate('dentistas')

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

            res.status(200).json(instituicao.dentistas)
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Erro interno do servidor' })
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.query.id

            const deletedInstituicao = await InstituicaoModel.findByIdAndDelete(id)
            await UsuarioModel.findByIdAndDelete(deletedInstituicao.user._id)

            res.status(200).json({ deletedInstituicao, msg: "Instituição excluida com sucesso!" })
        } catch (error) {
            console.log(error)
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

            await UsuarioModel.findByIdAndUpdate(updatedInstituicao.user._id, { email, senha })

            const instituicao = await updatedInstituicao.populate('user')

            res.status(200).json({ instituicao, msg: "Instituição atualizada com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = instituicaoController