const express = require("express");
const {
  getAllOffers,
  addOffer,
  getOfferById,
  updateStatus,
} = require("../controllers/offers.controller");

const router = express.Router({ mergeParams: true });

router.get("/", getAllOffers);
router.post("/", addOffer);
router.get("/:offer_id", getOfferById);
router.put("/:offer_id", updateStatus); // for reject

module.exports = router;
