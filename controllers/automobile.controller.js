const Automobile = require("../models/automible.model");
const { default: mongoose } = require("mongoose");

async function getAllAutomobiles(req, res, next) {
  try {
    const automobiles = await Automobile.find({});
    res.json({ data: automobiles });
  } catch (e) {
    next(e);
  }
}

async function addAutomobile(req, res, next) {
  try {
    const { long, lat, ...payload } = req.body;
    const result = await Automobile.create({
      ...payload,
      location: [long, lat],
    });
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
}

async function getAutoById(req, res, next) {
  try {
    const { auto_id: autoId } = req.params;
    const result = await Automobile.findOne({ _id: autoId });
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
}

async function updateAutoById(req, res, next) {
  try {
    const { auto_id: autoId } = req.params;
    const { long, lat, ...payload } = req.body;
    const result = await Automobile.updateOne(
      { _id: autoId },
      { _id: autoId, ...payload, location: [long, lat] }
    );
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
}

async function deleteAutoById(req, res, next) {
  try {
    const { auto_id: autoId } = req.params;
    const result = await Automobile.deleteOne({ _id: autoId });
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
}

async function uploadImage(req, res, next) {
  try {
    const { auto_id: autoId } = req.params;
    const files = req.files.map((file) => ({ fileName: file.filename }));

    const result = await Automobile.updateOne(
      { _id: autoId },
      { $addToSet: { pictures: { $each: files } } }
    );
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
}

async function getMyAutomobiles(req, res, next) {
  console.log("req.params", req.user);
  const { _id } = req.user;

  try {
    const automobiles = await Automobile.find({ "owner.ownerId": _id });
    res.json({ data: automobiles });
  } catch (e) {
    next(e);
  }
  const { user_id } = req.params;

  try {
    const automobiles = await Automobile.find({ "owner.ownerId": user_id });
    res.json({ data: automobiles });
  } catch (e) {
    next(e);
  }
}

async function autoPurchasedList(req, res, next) {
  try {
    const user_id = req.user._id;
    const automobiles = await Automobile.find(
      {
        "offers.userId": new mongoose.Types.ObjectId(user_id),
      },
      { title: 1, "offers.$": 1 }
    );
    res.json({ data: automobiles });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getAllAutomobiles,
  addAutomobile,
  getAutoById,
  updateAutoById,
  deleteAutoById,
  uploadImage,
  getMyAutomobiles,
  autoPurchasedList,
};
