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
      pacienteUser = await UsuarioModel.create(user);

      const pacienteObject = {
        name,
        cpf,
        condicoes,
        user: pacienteUser._id,
      };
      await PacienteModel.init();
      const paciente = await PacienteModel.create(pacienteObject);

      res
        .status(201)
        .json({ paciente, msg: "Paciente cadastrado com sucesso!" });
    } catch (error) {
      console.log(error);
      if (pacienteUser) await UsuarioModel.findByIdAndDelete(pacienteUser._id);

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

      res.status(201).json({ paciente, msg: "Paciente excluido com sucesso!" });
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
      const { name, email, senha, condicoes } = req.body.paciente;

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

      const updateUser = await UsuarioModel.findByIdAndUpdate(
        updatedPaciente.user._id,
        {
          email,
          senha,
        }
      );

      if (!updateUser) {
        res.status(404).json({ msg: "Paciente não encontrado!" });
        return;
      }

      res.status(201).json({ msg: "Paciente atualizado com sucesso!" });
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

      res.status(201).json({ dentistas: paciente.dentistas });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  removerPermissao: async (req, res) => {
    try {
      const { cpf, id } = req.params;

      const paciente = await PacienteModel.findOne({ cpf });
      if (!paciente) {
        res.status(404).json({ msg: "Paciente não encontrado!" });
        return;
      }

      const dentistA = paciente.dentistas.find(
        (dentistA) => dentistA.toString() === id
      );
      if (!dentistA) {
        res.status(404).json({ msg: "Dentista não encontrado!" });
        return;
      }

      paciente.dentistas = paciente.dentistas.filter(
        (dentistA) => dentistA.toString() !== id
      );
      paciente.save();

      res.status(201).json({ msg: "Permissão removida com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};

module.exports = pacienteController;
