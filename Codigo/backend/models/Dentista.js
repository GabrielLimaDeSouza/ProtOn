const mongoose = requeire("mongoose")
const { Schema } = mongoose;

const dentistaSchema = new Schema(
    {
        name: {
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
        }
    },
    { timestemps: true }
)

const Dentista = mongoose.model("Dentista", dentistaSchema)

export default {
    Dentista,
    dentistaSchema
}