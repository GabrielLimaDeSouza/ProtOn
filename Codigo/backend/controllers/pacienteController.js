const { Paciente: PacienteModel } = require("../models/Paciente");
const { Usuario: UsuarioModel } = require("../models/Usuario");

const pacienteController = {
  create: async (req, res) => {
    var pacienteUser = null;

    try {
      const { name, cpf, email, senha, condicoes } = req.body.paciente;

      const user = {
        email,
        senha,
        type: "paciente",
      };
      const pacienteUser = await UsuarioModel.create(user);

      const pacienteObject = {
        name,
        cpf,
        condicoes,
        user: pacienteUser._id,
      };
      const paciente = await PacienteModel.create(pacienteObject);

      res
        .status(201)
        .json({ paciente, msg: "Paciente cadastrado com sucesso!" });
    } catch (error) {
      console.log(error);
      await PacienteModel.findByIdAndDelete(pacienteUser._id);

      res
        .status(500)
        .json({ error: "Ocorreu um erro ao cadastrar o Paciente" });
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.query;
      const paciente = await PacienteModel.findById(id)
        .populate("user condicoes")
        .populate({
          path: "solicitacoes dentistas",
          select: "name user",
          populate: {
            path: "user",
            select: "email",
          },
        });

      if (!paciente) {
        res.status(404).json({ msg: `Paciente não encontrado!` });
        return;
      }

      res.status(201).json(paciente);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  getByCpf: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { dentista } = req.body;

      const paciente = await PacienteModel.findOne({ cpf })
        .select("name cpf condicoes user dentistas")
        .populate("condicoes")
        .populate({
          path: "user",
          select: "email",
        });

      if (!paciente) {
        res
          .status(404)
          .json({ error: `Paciente com cpf ${cpf} não encontrado!` });
        return;
      }

      const acesso = paciente.dentistas.find(
        (dentista1) => dentista1.toString() === dentista
      );
      if (!acesso) {
        res.status(401).json({ error: "Dentista sem permissão" });
        return;
      }

      res.status(201).json(paciente);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  getAll: async (req, res) => {
    try {
      const pacientes = await PacienteModel.find().populate("user condicoes");

      res.status(201).json(pacientes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.query;

      const paciente = await PacienteModel.findByIdAndDelete(id);
      await UsuarioModel.findByIdAndDelete(paciente.user._id);

      res.status(200).json({ paciente, msg: "Paciente excluido com sucesso!" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao apagar os dados do Paciente" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.query;
      const { name, email, senha, condicoes } = req.body;

      const updatedPaciente = await PacienteModel.findByIdAndUpdate(
        id,
        {
          name,
          condicoes,
        },
        { new: true }
      );

      if (!updatedPaciente) {
        res.status(404).json({ msg: "Paciente não encontrado!" });
        return;
      }

      await UsuarioModel.findByIdAndUpdate(updatedPaciente.user._id, {
        email,
        senha,
      });

      const paciente = await updatedPaciente.populate({
        path: "solicitacoes",
        select: "name user",
        populate: {
          path: "user",
          select: "email",
        },
      });

      res
        .status(200)
        .json({ paciente, msg: "Paciente atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao atualizar os dados do Paciente" });
    }
  },
  dentistas: async (req, res) => {
    try {
      const { id } = req.params;

      const paciente = await PacienteModel.findById(id).populate({
        path: "dentistas",
        select: "name user",
        populate: {
          path: "user",
          select: "email",
        },
      });

      if (!paciente) {
        res.status(404).json({ msg: "Paciente não encontrado!" });
        return;
      }

      res.status(200).json({ dentistas: paciente.dentistas });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  removerPermissao: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { dentista } = req.body;

      const paciente = await PacienteModel.findOne({ cpf });
      if (!paciente) {
        res.status(404).json({ msg: "Paciente não encontrado!" });
        return;
      }

      const dentistA = paciente.dentistas.find(
        (dentistA) => dentistA.toString() === dentista
      );
      if (!dentistA) {
        res.status(404).json({ msg: "Dentista não encontrado!" });
        return;
      }

      paciente.dentistas = paciente.dentistas.filter(
        (dentistA) => dentistA.toString() !== dentista
      );
      paciente.save();

      res.status(200).json({ msg: "Permissão removida com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};

module.exports = pacienteController;
