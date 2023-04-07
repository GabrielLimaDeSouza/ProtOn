const router = require("express").Router()

const instituicaoController = require("../controllers/instituicaoController")
// Dentista router
const dentistaRouter = require("./dentistaRouter")

// Paciente router
const pacienteRouter = require("./pacienteRouter")

// Instituição router
const instituicaoRouter = require("./instituicaoRouter")


router.use("/", dentistaRouter)
router.use("/", pacienteRouter)
router.use("/", instituicaoRouter)


module.exports = router
