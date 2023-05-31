const mongoose = require("mongoose");
const { Schema } = mongoose;

const dentistaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    matricula: {
      type: String,
      required: true,
      unique: true,
    },
    instituicao: {
      type: Schema.Types.ObjectId,
      ref: "Instituicao",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  { timestamps: true }
);

const Dentista = mongoose.model("Dentista", dentistaSchema);

module.exports = {
  Dentista,
  dentistaSchema,
};
