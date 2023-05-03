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
            enum: ['paciente', 'dentista', 'instituicao'],
            required: true
        },
        user: Schema.Types.ObjectId
    },
    { timestemps: true }
)

const Usuario = mongoose.model("Usuario", usuarioSchema)

module.exports = {
    Usuario,
    usuarioSchema
}