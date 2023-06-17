const router = require("express").Router();

//* Dentista router
const dentistaRouter = require("./dentistaRouter");

//* Paciente router
const pacienteRouter = require("./pacienteRouter");

//* Instituição router
const instituicaoRouter = require("./instituicaoRouter");

//* Condição router
const condicaoRouter = require("./condicaoRouter");

//* Usuario router
const usuarioRouter = require("./usuarioRouter");

//* Login router
const loginRouter = require("./loginRouter");

router.use("/", dentistaRouter);
router.use("/", pacienteRouter);
router.use("/", instituicaoRouter);
router.use("/", condicaoRouter);
router.use("/", usuarioRouter);
router.use("/", loginRouter);

module.exports = router;
