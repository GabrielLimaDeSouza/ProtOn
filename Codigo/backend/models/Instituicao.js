const mongoose = require("mongoose")
const { Schema } = mongoose;

const instituicaoSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            enum: ['Universidade', 'Clinica', 'Hospital'],
            required: true
        },
        dentistas: [{
            type: Schema.Types.ObjectId,
            ref: 'Dentista'
        }]
    },
    { timestemps: true }
)

const Instituicao = mongoose.model("Instituicao", instituicaoSchema)

module.exports = {
    Instituicao,
    instituicaoSchema
}