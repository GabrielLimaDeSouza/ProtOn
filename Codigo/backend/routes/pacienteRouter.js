const router = require("express").Router();
const pacienteController = require("../controllers/pacienteController");
const solicitacaoController = require("../controllers/solicitacaoController");
const authenticationMiddleware = require("../middlewares/auth");

//* CREATE Paciente
router
  .route("/paciente")
  .post((req, res) => pacienteController.create(req, res));

//* GET Paciente
router.get("/paciente", authenticationMiddleware, (req, res) =>
  pacienteController.get(req, res)
);

//* GET Dentistas Paciente
router.get("/paciente/:id/dentistas", authenticationMiddleware, (req, res) =>
  pacienteController.dentistas(req, res)
);

//* GET ALL Paciente
router.get("/pacientes", authenticationMiddleware, (req, res) =>
  pacienteController.getAll(req, res)
);

//* GET BY CPF Paciente
router.post("/paciente/cpf/:cpf", authenticationMiddleware, (req, res) =>
  pacienteController.getByCpf(req, res)
);

//* DELETE Paciente
router.delete("/paciente", authenticationMiddleware, (req, res) =>
  pacienteController.delete(req, res)
);

//* UPDATE Paciente
router.put("/paciente", authenticationMiddleware, (req, res) =>
  pacienteController.update(req, res)
);

//* ACEITAR Solicitação Paciente
router.put(
  "/paciente/:cpf/solicitacoes/:dentista",
  authenticationMiddleware,
  (req, res) => solicitacaoController.aceitarSolicitacao(req, res)
);

//* GET Solicitação Paciente
router.get(
  "/paciente/:cpf/solicitacoes",
  authenticationMiddleware,
  (req, res) => solicitacaoController.solicitacoes(req, res)
);

//* DELETE Solicitação Paciente
router.delete(
  "/paciente/:cpf/solicitacoes/:dentista",
  authenticationMiddleware,
  (req, res) => solicitacaoController.recusarSolicitacao(req, res)
);

//* DELETE Permisão Dentista
router.delete(
  "/paciente/:cpf/remover-dentista/:id",
  authenticationMiddleware,
  (req, res) => pacienteController.removerPermissao(req, res)
);

module.exports = router;
