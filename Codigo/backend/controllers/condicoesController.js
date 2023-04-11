const { Condicao: CondicaoModel } = require("../models/Condicao")

const condicaoController = {

    create: async (req,res)=>{
        try{

            console.log(req.body)

            const {nome, preAtendimento, anestesicoLocal, medicamentos, implante} = req.body

            
            const condicao = {
                nome,
                preAtendimento,
                anestesicoLocal, 
                medicamentos,
                implante
            }
            console.log(condicao)
            const response = await CondicaoModel.create(condicao);
        }catch(error){
            console.log(error)
        }
    },

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

module.exports = condicaoController
