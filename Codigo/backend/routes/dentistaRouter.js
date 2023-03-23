const router = require("express").Router()
const dentistaController = require("../controllers/dentistaController")

// CREATE Dentista
router.route("/dentista").post((req, res) => dentistaController.create(req, res))

// GET ALL Dentista
router.route("/dentista").get((req, res) => dentistaController.getAll(req, res))

// GET Dentista
router.route("/dentista/:id").get((req, res) => dentistaController.get(req, res))

// DELETE Dentista
router.route("/dentista/:id").delete((req, res) => dentistaController.delete(req, res))

// UPDATE Dentista
router.route("/dentista/:id").put((req, res) => dentistaController.update(req, res))


module.exports = router;
