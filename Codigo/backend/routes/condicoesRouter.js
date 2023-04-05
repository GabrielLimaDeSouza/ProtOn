const router = require("express").Router()
const condicoesController = require("../controllers/condicoesController")

// GET Condicoes
router.route("/condicao").get((req, res) => condicoesController.get(req, res))

// GET ALL Condicoes
router.route("/condicao").get((req, res) => condicoesController.getAll(req, res))

module.exports = router;
