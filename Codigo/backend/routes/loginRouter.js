const router = require("express").Router()
const loginController = require("../controllers/loginController")

// Login
router.route("/login").post((req, res) => loginController.login(req, res))

module.exports = router
