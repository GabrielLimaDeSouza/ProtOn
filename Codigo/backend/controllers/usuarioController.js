const { Usuario: UsuarioModel } = require("../models/Usuario.js");
const { Dentista: DentistaModel } = require("../models/Dentista.js");
const { Paciente: PacienteModel } = require("../models/Paciente.js");
const { Instituicao: InstituicaoModel } = require("../models/Instituicao.js");

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
            "instituicao"
          );
          break;

        case "paciente":
          userType = await PacienteModel.findOne({ user: user._id });

          data = await userType.populate({
            path: "dentistas solicitacoes",
            select: "name user instituicao",
            populate: [
              {
                path: "instituicao",
                select: "name tipo user email",
                populate: {
                  path: "user",
                  select: "email",
                },
              },
              { path: "user", select: "email" },
            ],
          });

          data = await data.populate({
            path: "condicoes",
            select: "-createdAt -updatedAt",
          });

          break;

        case "instituicao":
          userType = await InstituicaoModel.findOne({
            user: user._id,
          });

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

      data = await data.populate({
        path: "user",
        select: "-createdAt -updatedAt",
      });

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
