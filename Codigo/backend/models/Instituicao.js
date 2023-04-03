const mongoose = require("mongoose")
const { Schema } = mongoose;

const instituicaoSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        senha: {
            type: String,
            required: true
        },
        tipo: {
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