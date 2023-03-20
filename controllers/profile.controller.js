const Users = require("../models/users.model.js");

module.exports.updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    console.log("updateUser() - user_id: ", _id);
    const result = await Users.find({ _id: _id }, req.body);

    res.json({ sucess: true, data: result });
  } catch (error) {
    next(error);
  }
};
