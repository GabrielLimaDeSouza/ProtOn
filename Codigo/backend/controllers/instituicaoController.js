const dentistaController = require("./dentistaController");
const { Instituicao: InstituicaoModel } = require("../models/Instituicao");
const { Usuario: UsuarioModel } = require("../models/Usuario");
const { hash } = require("../services/authService");

const instituicaoController = {
  create: async (req, res) => {
    var instituicaoUser = null;

    try {
      const { name, email, senha, tipo } = req.body;

      const hashedPass = await hash(senha);

      const user = {
        email,
        senha: hashedPass,
        type: "instituicao",
      };
      instituicaoUser = await UsuarioModel.create(user);

      const instituicaoObject = {
        name,
        tipo,
        user: instituicaoUser._id,
      };
      await InstituicaoModel.create(instituicaoObject);

      res.status(201).json({ msg: "Instituicao cadastrada com sucesso!" });
    } catch (error) {
      console.log(error);
      await UsuarioModel.findByIdAndDelete(instituicaoUser._id);

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
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao cadastrar o Dentista!" });
    }
  },
  deleteDentista: async (req, res) => {
    try {
      const { id, dentista } = req.params;

      await dentistaController.delete(req, res);

      const instituicao = await InstituicaoModel.findById(id);
      instituicao.dentistas.filter(
        (_dentista) => _dentista._id.toString() !== dentista
      );
      await instituicao.save();

      res.status(201).json({
        msg: "Dentista excluido com sucesso!",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.getMessage() });
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
  getAll: async (req, res) => {
    try {
      const instituicao = await InstituicaoModel.find()


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

      res.status(201).json(instituicao.dentistas);
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

      await dentistaController.deleteAll(req, res);

      res.status(201).json({ msg: "Instituição excluida com sucesso!" });
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

      const instituicaoAtualizada = {
        email,
      };

      if (senha) instituicaoAtualizada.senha = await hash(senha);

      const instituicao = await UsuarioModel.findByIdAndUpdate(
        updatedInstituicao.user._id,
        instituicaoAtualizada,
        { new: true }
      );

      res
        .status(201)
        .json({ instituicao, msg: "Instituição atualizada com sucesso!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Ocorreu um erro ao atualizar os dados da Instituição",
      });
    }
  },
};

module.exports = instituicaoController;
