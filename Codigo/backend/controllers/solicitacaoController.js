const { Paciente: PacienteModel } = require("../models/Paciente");
const { Dentista: DentistaModel } = require("../models/Dentista");

const solicitacaoController = {
  solicitacoes: async (req, res) => {
    try {
      const { cpf } = req.params;

      var paciente = await PacienteModel.findOne({ cpf }).populate({
        path: "solicitacoes",
        select: "name user instituicao",
        populate: [
          {
            path: "user",
            select: "email",
          },
          {
            path: "instituicao",
            select: "name user tipo",
            populate: {
              path: "user",
              select: "email",
            },
          },
        ],
      });

      console.log(paciente);

      if (!paciente) {
        res.status(404).json({ msg: "Paciente não encontrado!" });
        return;
      }

      res.status(201).json(paciente.solicitacoes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  enviarSolicitacao: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { dentista } = req.body;

      const updatedPaciente = await PacienteModel.findOne({ cpf });
      if (!updatedPaciente) {
        res.status(404).json({ error: "Paciente não encontrado!" });
        return;
      }

      const dentistaObj = await DentistaModel.findById(dentista);
      if (!dentistaObj) {
        res.status(404).json({ error: "Dentista não encontrado!" });
        return;
      }

      const solicitacaoFound = updatedPaciente.solicitacoes.find(
        (solicitacao) => solicitacao.toString() === dentista
      );
      if (solicitacaoFound) {
        res.status(404).json({ error: "Solicitação já enviada!" });
        return;
      }

      const dentistaFound = updatedPaciente.dentistas.find(
        (dentistaA) => dentistaA.toString() === dentista
      );
      if (dentistaFound) {
        res.status(404).json({ error: "Solicitação já aceita!" });
        return;
      }

      updatedPaciente.solicitacoes.push(dentista);
      updatedPaciente.save();

      res.status(201).json({ msg: "Solicitação enviada" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  aceitarSolicitacao: async (req, res) => {
    try {
      const { cpf, dentista } = req.params;

      const paciente = await PacienteModel.findOne({ cpf });
      if (!paciente) {
        res.status(404).json({ error: "Paciente não encontrado!" });
        return;
      }

      const _dentista = await DentistaModel.findById(dentista);
      if (!_dentista) {
        res.status(404).json({ error: "Dentista não encontrado!" });
        return;
      }

      const solicitacaoFound = paciente.solicitacoes.find(
        (solicitacao) => solicitacao.toString() === dentista
      );
      if (!solicitacaoFound) {
        res.status(404).json({ error: "Solicitação não encontrada!" });
        return;
      }

      const dentistaFound = paciente.dentistas.find(
        (dentistaA) => dentistaA.toString() === dentista
      );
      if (dentistaFound) {
        res.status(404).json({ error: "Solicitação de dentista já aceita!" });
        return;
      }

      paciente.solicitacoes = paciente.solicitacoes.filter(
        (solicitacao) => solicitacao.toString() !== dentista
      );

      paciente.dentistas.push(dentista);
      paciente.save();

      res.status(201).json({ msg: "Solicitação aceita" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  recusarSolicitacao: async (req, res) => {
    try {
      const { cpf, dentista } = req.params;

      const paciente = await PacienteModel.findOne({ cpf });
      if (!paciente) {
        res.status(404).json({ error: "Paciente não encontrado!" });
        return;
      }

      const dentistaObj = await DentistaModel.findById(dentista);
      if (!dentistaObj) {
        res.status(404).json({ error: "Dentista não encontrado!" });
        return;
      }

      const solicitacaoFound = paciente.solicitacoes.find(
        (solicitacao) => solicitacao.toString() === dentista
      );
      if (!solicitacaoFound) {
        res.status(404).json({ error: "Solicitação não encontrada!" });
        return;
      }

      paciente.solicitacoes = paciente.solicitacoes.filter(
        (solicitacao) => solicitacao.toString() !== dentista
      );

      paciente.save();

      res.status(201).json({ msg: "Solicitação recusada" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};

module.exports = solicitacaoController;
