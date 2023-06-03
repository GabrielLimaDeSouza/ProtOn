const { Dentista: DentistaModel } = require("../models/Dentista");
const { Usuario: UsuarioModel } = require("../models/Usuario");

const dentistaController = {
  create: async (req, res) => {
    var dentistaUser = null;

    try {
      const { name, email, senha, matricula, instituicao } = req.body.dentista;

      const user = {
        email,
        senha,
        type: "dentista",
      };
      dentistaUser = await UsuarioModel.create(user);

      const dentistaObject = {
        name,
        matricula,
        instituicao,
        user: dentistaUser._id,
      };
      const dentista = await DentistaModel.create(dentistaObject);

      return dentista.populate("user");
    } catch (error) {
      console.log(error);

      await UsuarioModel.findByIdAndDelete(dentistaUser._id);

      throw new Error();
    }
  },
  getAll: async (req, res) => {
    try {
      const dentistas = await DentistaModel.find().populate("user");

      res.status(201).json({ dentistas });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.query;
      const dentista = await DentistaModel.findById(id).populate({
        path: "user instituicao",
        populate: {
          path: "dentistas",
        },
      });

      if (!dentista) {
        res.status(404).json({ msg: "Dentista não encontrado!" });
        return;
      }

      res.status(201).json({ dentista });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  delete: async (req) => {
    var msg = null;
    try {
      const { dentista } = req.params;
      console.log(dentista);

      const dentistaResp = await DentistaModel.findByIdAndDelete(dentista);

      if (!dentistaResp) {
        msg = "Dentista não encontrado!";
        throw new Error();
      }

      await UsuarioModel.findByIdAndDelete(dentistaResp.user);

      return dentistaResp;
    } catch (error) {
      console.log(error);
      throw new Error(msg || "Erro interno do servidor");
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.query;
      const { name, email, senha } = req.body.dentista;

      const updatedDentista = await DentistaModel.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      ).populate("user");

      if (!updatedDentista) {
        res.status(404).json({ msg: "Dentista não encontrado!" });
        return;
      }

      const dentista = await UsuarioModel.findByIdAndUpdate(
        updatedDentista.user._id,
        {
          email,
          senha,
        },
        { new: true }
      );

      res
        .status(201)
        .json({ dentista, msg: "Dentista atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao atualizar os dados do Dentista" });
    }
  },

  deleteAll: async (req, res) => {
    try {
      const { id } = req.query;
      const dentistas = await DentistaModel.deleteMany({ instituicao: id });

      if (dentistas) {
        return;
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  },
};

module.exports = dentistaController;
