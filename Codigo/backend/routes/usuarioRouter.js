const router = require("express").Router();
const usuarioController = require("../controllers/usuarioController");
const authenticationMiddleware = require("../middlewares/auth");

//! Middleware
router.use(authenticationMiddleware);

// GET Usuario
router.route("/usuario").get((req, res) => usuarioController.get(req, res));

// GET ALL Usuario
router.route("/usuarios").get((req, res) => usuarioController.getAll(req, res));

module.exports = router;
