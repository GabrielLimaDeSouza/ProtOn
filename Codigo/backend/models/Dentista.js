const mongoose = require("mongoose")
const { Schema } = mongoose;

const dentistaSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        matricula: {
            type: String,
            required: true
        },
        pacientes: [{
            type: Schema.Types.ObjectId,
            ref: 'Paciente'
        }],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    },
    { timestemps: true }
)

const Dentista = mongoose.model("Dentista", dentistaSchema)

module.exports = {
    Dentista,
    dentistaSchema
}