const router = require("express").Router()

// Dentista router
const dentistaRouter = require("./dentistaRouter")

router.use("/", dentistaRouter)

module.exports = router
