const router = require("express").Router()

// Dentista router
const dentistaRouter = require("./dentistaRouter")

// Paciente router
const pacienteRouter = require("./pacienteRouter")


router.use("/", dentistaRouter)
router.use("/", pacienteRouter)


module.exports = router
