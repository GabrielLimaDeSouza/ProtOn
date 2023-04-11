const router = require("express").Router()

const instituicaoController = require("../controllers/instituicaoController")
// Dentista router
const dentistaRouter = require("./dentistaRouter")

// Paciente router
const pacienteRouter = require("./pacienteRouter")

// Instituição router
const instituicaoRouter = require("./instituicaoRouter")

// Condição router
const condicaoRouter = require("./condicaoRouter")


router.use("/", dentistaRouter)
router.use("/", pacienteRouter)
router.use("/", instituicaoRouter)
router.use("/", condicaoRouter)

module.exports = router
