const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    updateUser
} = require("../controllers/profile.controller.js");

router.put("/", updateUser);

module.exports = router;