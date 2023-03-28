const mongoose = require("mongoose")
const { Schema } = mongoose;

const instituicaoSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        cnpj: {
            type: String,
            required: true
        }
    },
    { timestemps: true }
)

const Instituicao = mongoose.model("Instituicao", instituicaoSchema)

module.exports = {
    Instituicao,
    instituicaoSchema
}