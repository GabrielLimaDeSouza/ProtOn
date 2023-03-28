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
        email: {
            type: String,
            required: true
        },
        senha: {
            type: String,
            required: true
        },
        condicoes: [{
            _id: {
                type: String,
                required: true
            },
            nome: {
                type: String,
                required: true
            }
        }]
    },
    { timestemps: true }
)

const Paciente = mongoose.model("Paciente", pacienteSchema)

module.exports = {
    Paciente,
    pacienteSchema
}