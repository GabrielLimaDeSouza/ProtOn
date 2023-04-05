const mongoose = require("mongoose")
const { Schema } = mongoose;

const condicoesSchema = new Schema(
    {
        nome: {
            type: String,
            required: true
        },
        sintomas: {
            type: String,
            required: true
        }
    },
    { timestemps: true }
)

const Condicoes = mongoose.model("Dentista", condicoesSchema)

module.exports = {
    Condicoes,
    condicoesSchema
}