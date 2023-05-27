const dentistaController = require("./dentistaController");
const { Instituicao: InstituicaoModel } = require("../models/Instituicao");
const { Usuario: UsuarioModel } = require("../models/Usuario");

const instituicaoController = {
  create: async (req, res) => {
    try {
      const { name, email, senha, tipo } = req.body;

      const instituicaoObject = {
        name,
        tipo,
      };
      const instituicao = await InstituicaoModel.create(instituicaoObject);

      const user = {
        email,
        senha,
        type: "instituicao",
        user: instituicao._id,
      };
      const instituicaoUser = await UsuarioModel.create(user);

      res
        .status(201)
        .json({ instituicaoUser, msg: "Instituicao cadastrada com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao cadastrar a instituição!" });
    }
  },
  createDentista: async (req, res) => {
    try {
      const { id } = req.params;
      const dentista = await dentistaController.create(req, res);

      const instituicao = await InstituicaoModel.findById(id);
      instituicao.dentistas.push(dentista._id);
      await instituicao.save();

      res
        .status(201)
        .json({ dentista, msg: "Dentista cadastrado com sucesso" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao cadastrar o Dentista!" });
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.query;
      const instituicao = await InstituicaoModel.findById(id).populate({
        path: "dentistas",
        populate: {
          path: "user",
        },
      });

      if (!instituicao) {
        res.status(404).json({ msg: "Instituição não encontrada!" });
        return;
      }

      res.status(201).json(instituicao);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  getAllDentistas: async (req, res) => {
    try {
      const { id } = req.params;
      const instituicao = await InstituicaoModel.findById(id).populate(
        "dentistas"
      );

      if (!instituicao) {
        res.status(404).json({ msg: "Nenhuma Instituição encontrada" });
        return;
      }

      res.status(200).json(instituicao.dentistas);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.query;

      const deletedInstituicao = await InstituicaoModel.findByIdAndDelete(
        id
      ).populate("user");
      await UsuarioModel.findByIdAndDelete(deletedInstituicao.user._id);

      res
        .status(200)
        .json({ deletedInstituicao, msg: "Instituição excluida com sucesso!" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao apagar os dados da Instituição" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.query;
      const { name, email, senha } = req.body;

      const updatedInstituicao = await InstituicaoModel.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      ).populate("user");

      if (!updatedInstituicao) {
        res.status(404).json({ msg: "Instituição não encontrada!" });
        return;
      }

      const instituicao = await UsuarioModel.findByIdAndUpdate(
        updatedInstituicao.user._id,
        { email, senha },
        { new: true }
      );

      res
        .status(200)
        .json({ instituicao, msg: "Instituição atualizada com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Ocorreu um erro ao atualizar os dados da Instituição",
      });
    }
  },
};

module.exports = instituicaoController;
