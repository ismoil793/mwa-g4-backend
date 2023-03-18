const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  login,
  singup,
  getUserById,
  getAllUsers,
} = require("../controllers/users.controllers.js");

router.get("/:user_id", getUserById);
router.get("/", getAllUsers);
router.post("/login", login);
router.post("/signup", singup);

module.exports = router;
