const mongoose = require("mongoose")
const { Schema } = mongoose;

const dentistaSchema = new Schema(
    {
        matricula: {
            type: String,
            required: true
        },
        instituicao: {
            type: Schema.Types.ObjectId,
            ref: 'Instituicao'
        }
    },
    { timestemps: true }
)

const Dentista = mongoose.model("Dentista", dentistaSchema)

module.exports = {
    Dentista,
    dentistaSchema
}