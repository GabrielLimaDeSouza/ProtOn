const router = require("express").Router();
const pacienteController = require("../controllers/pacienteController");
const solicitacaoController = require("../controllers/solicitacaoController");
const authenticationMiddleware = require("../middlewares/auth");

// CREATE Paciente
router
  .route("/paciente")
  .post((req, res) => pacienteController.create(req, res));

//! Middleware
router.use(authenticationMiddleware);

// GET Paciente
router.route("/paciente").get((req, res) => pacienteController.get(req, res));

// GET Dentistas Paciente
router
  .route("/paciente/:id/dentistas")
  .get((req, res) => pacienteController.dentistas(req, res));

// GET ALL Paciente
router
  .route("/pacientes")
  .get((req, res) => pacienteController.getAll(req, res));

// GET BY CPF Paciente
router
  .route("/paciente/cpf/:cpf")
  .post((req, res) => pacienteController.getByCpf(req, res));

// DELETE Paciente
router
  .route("/paciente")
  .delete((req, res) => pacienteController.delete(req, res));

// UPDATE Paciente
router
  .route("/paciente")
  .put((req, res) => pacienteController.update(req, res));

// ACEITAR Solicitação Paciente
router
  .route("/paciente/:cpf/solicitacoes/:dentista")
  .put((req, res) => solicitacaoController.aceitarSolicitacao(req, res));

// GET Solicitação Paciente
router
  .route("/paciente/:cpf/solicitacoes")
  .get((req, res) => solicitacaoController.solicitacoes(req, res));

// DELETE Solicitação Paciente
router
  .route("/paciente/:cpf/solicitacoes/:dentista")
  .delete((req, res) => solicitacaoController.recusarSolicitacao(req, res));

// DELETE Permisão Dentista
router
  .route("/paciente/:cpf/remover-dentista/:id")
  .delete((req, res) => pacienteController.removerPermissao(req, res));

module.exports = router;
