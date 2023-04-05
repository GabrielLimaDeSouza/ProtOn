const router = require("express").Router()
const pacienteController = require("../controllers/pecienteController")

// CREATE Paciente
router.route("/paciente").post((req, res) => pacienteController.create(req, res))

// GET Paciente
router.route("/paciente/id/:id").get((req, res) => pacienteController.get(req, res))

// GET ALL Paciente
router.route("/paciente").get((req, res) => pacienteController.getAll(req, res))

// GET BY CPF Paciente
router.route("/paciente/cpf/:cpf").get((req, res) => pacienteController.getByCpf(req, res))

// DELETE Paciente
router.route("/paciente").delete((req, res) => pacienteController.delete(req, res))

// UPDATE Paciente
router.route("/paciente").put((req, res) => pacienteController.update(req, res))


module.exports = router;
