const mongoose = require("mongoose")
const { Schema } = mongoose;

const pacienteSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        },
        dentista: [{
            type: Schema.Types.ObjectId,
            ref: 'Dentista'
        }],
        condicoes: [{
            type: Schema.Types.ObjectId,
            ref: 'Condicao'
        }],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    },
    { timestemps: true }
)

const Paciente = mongoose.model("Paciente", pacienteSchema)

module.exports = {
    Paciente,
    pacienteSchema
}