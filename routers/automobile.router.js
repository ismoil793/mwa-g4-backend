const express = require("express");
const {
  getAllAutomobiles,
  addAutomobile,
  getAutoById,
  getMyAutomobiles,
  updateAutoById,
  searchAutomobiles,
} = require("../controllers/automobile.controller");
const offersRouter = require("./offers.router");
const router = express.Router();

router.get("/", getAllAutomobiles); // GET /automobiles
router.post("/", addAutomobile);
router.get("/myAutomobiles/:user_id", getMyAutomobiles);
router.get("/:auto_id", getAutoById);
router.put("/:auto_id", updateAutoById);
router.post("/search", searchAutomobiles);
// router.delete('/:auto_id')
// router.post('/:auto_id/upload')
// router.get('/:auto_id/images')

router.use("/:auto_id/offers/", offersRouter);
module.exports = router;
