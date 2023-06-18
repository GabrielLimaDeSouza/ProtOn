const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    senha: {
      type: String,
      required: true,
      select: false,
    },
    type: {
      type: String,
      enum: ["paciente", "dentista", "instituicao"],
      required: true,
    },
  },
  { timestamps: true }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = {
  Usuario,
  usuarioSchema,
};
