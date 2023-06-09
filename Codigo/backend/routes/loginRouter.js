const router = require("express").Router();
const loginController = require("../controllers/loginController");

//* Login
router.route("/login").post((req, res) => loginController.login(req, res));

//* Recuperar Senha
router
  .route("/recuperar-senha")
  .post((req, res) => loginController.createCode(req, res));

//* Recuperar Senha
router
  .route("/recuperar-senha")
  .put((req, res) => loginController.recoveryPass(req, res));

module.exports = router;
