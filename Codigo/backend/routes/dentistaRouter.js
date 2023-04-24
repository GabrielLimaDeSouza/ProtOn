const router = require("express").Router()
const dentistaController = require("../controllers/dentistaController")

// CREATE Dentista
router.route("/dentista").post((req, res) => dentistaController.create(req, res))

// GET ALL Dentista
router.route("/dentista").get((req, res) => dentistaController.getAll(req, res))

// GET Dentista
router.route("/dentista/:id").get((req, res) => dentistaController.get(req, res))

// GET Dentistas com id Instituição
router.route("/dentista/instituicao").get((req, res) => dentistaController.getAllDentistasInstituicao(req, res))

// DELETE Dentista
router.route("/dentista").delete((req, res) => dentistaController.delete(req, res))

// UPDATE Dentista
router.route("/dentista").put((req, res) => dentistaController.update(req, res))


module.exports = router