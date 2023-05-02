const mongoose = require("mongoose")
const { Schema } = mongoose;

const usuarioSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        senha: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        user: [{
            type: Schema.Types.ObjectId,
            ref: 'Paciente'
        },
        {
            type: Schema.Types.ObjectId,
            ref: 'Insituicao'
        },
        {
            type: Schema.Types.ObjectId,
            ref: 'Dentista'
        }]
    },
    { timestemps: true }
)

const Usuario = mongoose.model("Usuario", usuarioSchema)

module.exports = {
    Usuario,
    usuarioSchema
}