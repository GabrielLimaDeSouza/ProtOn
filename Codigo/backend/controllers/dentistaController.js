const { Dentista: DentistaModel } = require("../models/Dentista");
const { Usuario: UsuarioModel } = require("../models/Usuario");
const { hash } = require("../services/authService");

const dentistaController = {
  create: async (req, res) => {
    var dentistaUser = null;

    try {
      const { name, email, senha, matricula, instituicao } = req.body;

      const hashedPass = await hash(senha);

      const user = {
        email,
        senha: hashedPass,
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
    } catch (err) {
      console.log(err);
      await UsuarioModel.findByIdAndDelete(dentistaUser._id);

      throw new Error();
    }
  },
  getAll: async (req, res) => {
    try {
      const dentistas = await DentistaModel.find();

      res.status(201).json(dentistas);
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

      const dentistaResp = await DentistaModel.findByIdAndDelete(dentista);

      if (!dentistaResp) {
        msg = "Dentista não encontrado!";
        throw new Error();
      }

      await UsuarioModel.findByIdAndDelete(dentistaResp.user);
      return;
    } catch (error) {
      console.log(error);
      throw new Error(msg || "Erro interno do servidor");
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.query;
      const { name, email, senha } = req.body;

      console.log(id);
      console.log(req.body);

      const updatedDentista = await DentistaModel.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      ).populate("user");

      if (!updatedDentista) {
        res.status(404).json({ msg: "Dentista não encontrado!" });
        return;
      }

      const dentistaAtualizado = {
        email,
      };

      if (senha) dentistaAtualizado.senha = await hash(senha);

      const dentista = await UsuarioModel.findByIdAndUpdate(
        updatedDentista.user._id,
        dentistaAtualizado,
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

      const dentistas = await DentistaModel.find({ instituicao: id });
      dentistas.forEach(async (dentista) => {
        await UsuarioModel.deleteOne({ _id: dentista.user });
      });

      await DentistaModel.deleteMany({ instituicao: id });

      return;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  },
};

module.exports = dentistaController;
