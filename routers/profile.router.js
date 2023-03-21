const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  updateUser,
  userStat,
} = require("../controllers/profile.controller.js");

router.put("/", updateUser);
router.get("/stats", userStat);

module.exports = router;
