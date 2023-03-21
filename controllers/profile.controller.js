const Users = require("../models/users.model.js");
const { updateUser } = require("./users.controllers.js");


module.exports.updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;    
    const [longitude, latitude] = req.body.location;

    const updatedUser = {
      ...req.body,
      ...{
        location: {
          type: "Point",
          coordinates: [
              longitude,
              latitude
          ]
      },
      }
    } 

    const result = await Users.updateOne({ _id: _id }, updatedUser);

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
