const mongoose = require("mongoose");
const { Schema } = mongoose;

const condicaoSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    preAtendimento: [
      {
        type: String,
        required: true,
      },
    ],
    anestesicoLocal: [
      {
        type: String,
        required: true,
      },
    ],
    medicamentos: [
      {
        type: String,
        required: true,
      },
    ],
    implante: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Condicao = mongoose.model("Condicao", condicaoSchema);

module.exports = {
  Condicao,
  condicaoSchema,
};
