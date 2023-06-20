const router = require("express").Router();
const instituicaoController = require("../controllers/instituicaoController");
const authenticationMiddleware = require("../middlewares/auth");

//* CREATE Instituicao
router
  .route("/instituicao")
  .post((req, res) => instituicaoController.create(req, res));

//* CREATE Dentista
router.post("/instituicao/:id/dentista", authenticationMiddleware, (req, res) =>
  instituicaoController.createDentista(req, res)
);

//* DELETE Dentista
router.delete(
  "/instituicao/:id/dentista/:dentista",
  authenticationMiddleware,
  (req, res) => instituicaoController.deleteDentista(req, res)
);

//* GET ALL Dentistas FROM Instituicao
router.get("/instituicao/:id/dentistas", authenticationMiddleware, (req, res) =>
  instituicaoController.getAllDentistas(req, res)
);

//* GET Instituicao
router.get("/instituicao", authenticationMiddleware, (req, res) =>
  instituicaoController.get(req, res)
);

//* GET ALL Instituicao
router.get("/instituicoes", (req, res) =>
  instituicaoController.getAll(req, res)
);

//* DELETE Instituicao
router.delete("/instituicao", authenticationMiddleware, (req, res) =>
  instituicaoController.delete(req, res)
);

//* UPDATE Instituicao
router.put("/instituicao", authenticationMiddleware, (req, res) =>
  instituicaoController.update(req, res)
);

module.exports = router;
