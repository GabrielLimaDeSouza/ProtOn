const mongoose = require("mongoose");
const { Schema } = mongoose;

const pacienteSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      unique: true,
      required: true,
    },
    dentistas: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dentista",
      },
    ],
    condicoes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Condicao",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    solicitacoes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dentista",
      },
    ],
  },
  { timestamps: true }
);

const Paciente = mongoose.model("Paciente", pacienteSchema);

module.exports = {
  Paciente,
  pacienteSchema,
};
