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
        condicoes: [{
            type: Schema.Types.ObjectId,
            ref: 'Condicao'
        }]
    },
    { timestemps: true }
)

const Paciente = mongoose.model("Paciente", pacienteSchema)

module.exports = {
    Paciente,
    pacienteSchema
}