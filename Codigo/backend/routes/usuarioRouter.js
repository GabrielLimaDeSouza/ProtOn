const router = require("express").Router();
const usuarioController = require("../controllers/usuarioController");
const authenticationMiddleware = require("../middlewares/auth");

//* GET Usuario
router.get("/usuario", authenticationMiddleware, (req, res) =>
  usuarioController.get(req, res)
);

//* GET ALL Usuario
router.get("/usuarios", authenticationMiddleware, (req, res) =>
  usuarioController.getAll(req, res)
);

module.exports = router;
