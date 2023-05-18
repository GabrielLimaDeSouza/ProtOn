const router = require("express").Router()
const dentistaController = require("../controllers/dentistaController")
const solicitacaoController = require("../controllers/solicitacaoController")
const authenticationMiddleware = require("../middlewares/auth")

//! Middleware
//router.use(authenticationMiddleware)

// GET ALL Dentista
router.route("/dentistas").get((req, res) => dentistaController.getAll(req, res))

// GET Dentista
router.route("/dentista").get((req, res) => dentistaController.get(req, res))

// DELETE Dentista
router.route("/dentista").delete((req, res) => dentistaController.delete(req, res))

// UPDATE Dentista
router.route("/dentista").put((req, res) => dentistaController.update(req, res))

// ENVIAR Solicitação Dentista
router.route('/dentista/enviar-solicitacao/:cpf').put((req, res) => solicitacaoController.enviarSolicitacao(req, res))


module.exports = router