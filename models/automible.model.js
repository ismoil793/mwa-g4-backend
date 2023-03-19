const mongoose = require("mongoose");

const automobileSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // text indexing
    description: String, // text indexing
    owner: {
      ownerId: mongoose.Schema.Types.ObjectId,
      fullName: String,
    },
    color: String,
    interiorColor: String,
    vin: Number,
    type: String,
    price: Number,
    pictures: [
      {
        fileName: String,
      },
    ],
    location: [String, String], //long, lat
    offers: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        fullname: String,
        status: String, //approved, reject, none
        comment: String,
      },
    ],
    status: String, //  "sold"
  },
  {
    timestamps: true,
  }
);

const automobileModel = mongoose.model("automobile", automobileSchema);

module.exports = automobileModel;
