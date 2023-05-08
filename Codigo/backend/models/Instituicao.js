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
            enum: ['Universidade', 'Clínica', 'Hospital'],
            default: 'Clínica',
            required: true,
            message: '{VALUE} is not supported'
        },
        dentistas: [{
            type: Schema.Types.ObjectId,
            ref: 'Dentista'
        }],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    },
    { timestemps: true }
)

const Instituicao = mongoose.model("Instituicao", instituicaoSchema)

module.exports = {
    Instituicao,
    instituicaoSchema
}