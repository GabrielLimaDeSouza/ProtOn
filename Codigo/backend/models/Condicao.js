const mongoose = require("mongoose")
const { Schema } = mongoose;

const condicaoSchema = new Schema(
    {
        nome: {
            type: String,
            required: true
        },
        preAtendimento: [{type: String}],
        anestesicoLocal: [{type: String}],
        medicamentos: [{type: String}],
        implante: [{type: String}]
    },
    { timestemps: true }
)

const Condicao = mongoose.model("Condicao", condicaoSchema)

module.exports = {
    Condicao,
    condicaoSchema
}