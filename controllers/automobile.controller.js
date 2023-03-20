const Automobile = require("../models/automible.model");

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
    const payload = req.body;
    const result = await Automobile.create(payload);
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
    const result = await Automobile.updateOne(
      { _id: autoId },
      { _id: autoId, ...req.body }
    );
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
}

async function getMyAutomobiles(req, res, next) {

  const { user_id }= req.params;

  try {
    const automobiles = await Automobile.find({"owner.ownerId": user_id});
    res.json({ data: automobiles });
  } catch (e) {
    next(e);
  }
}

async function searchAutomobiles(req, res, next) {
  const { search_query } = req.body;
  try {
    console.log('search_query: ', search_query);

    const automobiles = await Automobile.find({
            $or: [
        { "title": new RegExp(search_query, "gi") },
        { "description": new RegExp(search_query, "gi") },
        { "color": new RegExp(search_query, "gi") },
        { "type": new RegExp(search_query, "gi") },
            ]
        });

    res.json({ data: automobiles });
  } catch (e) {
    next(e);
  }
}

async function searchNearBy(req, res, next) {
  const { long, lat } = req.body;
  try {
    console.log('long: ' + long + ', lat: ' + lat);

    const automobiles = await Automobile.find({
      location:
        { $near: [currentLong, currentLat] }
    }).limit(20);

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
  getMyAutomobiles,
  searchAutomobiles
};
