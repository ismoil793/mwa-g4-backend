const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  fullname: String,
  location: [String, String],
  location2: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: false
    },
    coordinates: {
      type: [Number],
      required: false,
      sparse: true,
    }
  }
});

userSchema.index({location2: '2dsphere'});

module.exports = mongoose.model("Users", userSchema);

