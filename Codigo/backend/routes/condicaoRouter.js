const router = require("express").Router()
const condicoesController = require("../controllers/condicoesController")
const authenticationMiddleware = require("../middlewares/auth")

// CREATE Dentista 
router.route("/condicao").post((req, res) => condicoesController.create(req, res))


//! Middleware
router.use(authenticationMiddleware)

// GET Condicoes
router.route("/condicao").get((req, res) => condicoesController.get(req, res))

// GET ALL Condicoes
router.route("/condicao").get((req, res) => condicoesController.getAll(req, res))

module.exports = router;
