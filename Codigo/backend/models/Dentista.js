const mongoose = require("mongoose")
const { Schema } = mongoose;

const dentistaSchema = new Schema(
    {
        matricula: {
            type: String,
            required: true
        },
        pacientes: [{
            type: Schema.Types.ObjectId,
            ref: 'Paciente'
        }]
    },
    { timestemps: true }
)

const Dentista = mongoose.model("Dentista", dentistaSchema)

module.exports = {
    Dentista,
    dentistaSchema
}