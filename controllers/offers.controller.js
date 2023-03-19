const Automobile = require("../models/automible.model");

module.exports.getAllOffers = async (req, res, next) => {
  try {
    const { auto_id } = req.params;
    const autos = await Automobile.findOne(
      { _id: auto_id },
      {
        offers: 1,
        title: 1,
        vin: 1,
        type: 1,
        color: 1,
      }
    );
    res.json({
      success: true,
      data: autos,
    });
  } catch (e) {
    next(e);
  }
};

module.exports.addOffer = async (req, res, next) => {
  try {
    const { auto_id } = req.params;
    const newOffer = req.body;
    /**
         * body json type
         * {
                userId: mongoose.Schema.Types.ObjectId,
                fullname:String,
                status: String, // initially it should be "none" 
                comment: String
            }
         */
    const result = await Automobile.updateOne(
      { _id: auto_id },
      { $push: { offers: { ...newOffer } } }
    );

    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.getOfferById = async (req, res, next) => {
  try {
    const { auto_id, offer_id } = req.params;

    const result = await Automobile.findOne(
      {
        _id: auto_id,
        "offers._id": offer_id,
      },
      { "offers.$": 1 }
    );

    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.updateStatus = async (req, res, next) => {
  try {
    const { auto_id, offer_id } = req.params;
    const updateOffer = req.body;

    const result = await Automobile.updateOne(
      { _id: auto_id, "offers._id": offer_id },
      {
        $set: {
          "offers.$.status": updateOffer.status,
        },
      }
    );

    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.updateStatusAndOwner = async (req, res, next) => {
  try {
    const { auto_id, offer_id } = req.params;
    const updateOffer = req.body; // status, fullname: ,  userId

    console.log(updateOffer);
    const result = await Automobile.updateOne(
      { _id: auto_id, "offers._id": offer_id },
      {
        $set: {
          "offers.$.status": updateOffer.status,
        },
      }
    );
    await Automobile.updateOne(
      { _id: auto_id },
      {
        $set: {
          status: "Sold",
        },
      }
    );

    // const result = await Automobile.updateOne(
    //     { _id: auto_id },
    //     {
    //         $set: {
    //             //"owner.ownerId": updateOffer.userId,
    //             "owner.fullName": updateOffer.fullname,
    //         },
    //     }
    // );

    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};
