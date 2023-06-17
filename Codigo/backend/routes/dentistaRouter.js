const router = require("express").Router();
const dentistaController = require("../controllers/dentistaController");
const solicitacaoController = require("../controllers/solicitacaoController");
const authenticationMiddleware = require("../middlewares/auth");

//* GET ALL Dentista
router.get("/dentistas", authenticationMiddleware, (req, res) =>
  dentistaController.getAll(req, res)
);

//* GET Dentista
router.get("/dentista", authenticationMiddleware, (req, res) =>
  dentistaController.get(req, res)
);

//* UPDATE Dentista
router.put("/dentista", authenticationMiddleware, (req, res) =>
  dentistaController.update(req, res)
);

//* ENVIAR Solicitação Dentista
router.put(
  "/dentista/enviar-solicitacao/:cpf",
  authenticationMiddleware,
  (req, res) => solicitacaoController.enviarSolicitacao(req, res)
);

module.exports = router;
