const mongoose = require('mongoose');
const automobileModel = require("../models/automible.model");
const { updateUser } = require("./users.controllers.js");

module.exports.updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const [longitude, latitude] = req.body.location;

    const updatedUser = {
      ...req.body,
      ...{
        location2: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      },
    };

    const result = await Users.updateOne({ _id: _id }, updatedUser);

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports.userStat = async (req, res, next) => {
  try {
    const { _id } = req.user;
    console.log("user id aggregate", _id);

    const ids = [];
    ids.push(new mongoose.Types.ObjectId(_id))

    const result = await automobileModel.aggregate([
      { $match: { "owner.ownerId": { "$in": ids } } },
      {$group: {
        _id: "$owner.ownerId",
        total_sales: { $sum: "$price" },
        count: {$sum: 1} }}
    ]);

    /*
    const result = await automobileModel.aggregate([
      {
        $group: {
          _id: "$_id",
          total_sales: { $sum: "$price" },
        },
      },
    ]);*/

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
