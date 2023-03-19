const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  fullname: String,
  location: [String, String],
});

module.exports = mongoose.model("Users", userSchema);
