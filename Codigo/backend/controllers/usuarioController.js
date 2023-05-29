const { Usuario: UsuarioModel } = require("../models/Usuario");
const { Dentista: DentistaModel } = require("../models/Dentista");
const { Paciente: PacienteModel } = require("../models/Paciente");
const { Instituicao: InstituicaoModel } = require("../models/Instituicao");

const usuarioController = {
  get: async (req, res) => {
    try {
      const _id = req.query.id;
      const user = await UsuarioModel.findById(_id);

      if (!user) {
        res.status(404).json({ msg: `Usuario não encontrado!` });
        return;
      }

      let userType = (data = null);

      switch (user.type) {
        case "dentista":
          data = await DentistaModel.findOne({ user: user._id }).populate(
            "instituicao user"
          );
          break;

        case "paciente":
          userType = await PacienteModel.findOne({ user: user._id });
          data = await userType.populate(
            "dentistas solicitacoes user condicoes"
          );
          break;

        case "instituicao":
          userType = await InstituicaoModel.findOne({
            user: user._id,
          }).populate("user");
          data = await userType.populate({
            path: "dentistas",
            populate: {
              path: "user",
            },
          });

          break;

        default:
          res
            .status(500)
            .json({ msg: `Usuario ${user.type} de ${_id} não encontrado!` });
          return;
      }

      data = await data.populate("user");

      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await UsuarioModel.find();

      res.status(201).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};

module.exports = usuarioController;
