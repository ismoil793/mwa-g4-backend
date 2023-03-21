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
    state: String,
    city: String,
    zipcode: Number,
    location: {
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
    },
    offers: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        fullName: String,
        status: String, //approved, reject, none
        comment: String,
      },
    ],
    status: String, //  "Sold"
  },
  {
    timestamps: true,
  }
);

automobileSchema.index({ location: '2dsphere' });
automobileSchema.index({title: 1, description: 1, color: 1, type: 1});

const automobileModel = mongoose.model("automobile", automobileSchema);

module.exports = automobileModel;
