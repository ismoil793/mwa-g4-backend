const Automobile = require("../models/automible.model");
const { default: mongoose } = require("mongoose");
const Users = require("../models/users.model.js");

async function getAllAutomobiles(req, res, next) {
  try {
    const { _id: ownerId } = req.user;
    const automobiles = await Automobile.find({
      "owner.ownerId": { $ne: new mongoose.Types.ObjectId(ownerId) },
      status: { $ne: "Sold" },
    });
    res.json({ data: automobiles });
  } catch (e) {
    next(e);
  }
}

async function addAutomobile(req, res, next) {
  try {
    const { long, lat, ...payload } = req.body;
    const { _id: ownerId, fullname: fullName } = req.user;
    const result = await Automobile.create({
      ...payload,
      owner: { ownerId: new mongoose.Types.ObjectId(ownerId), fullName },
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
    const { _id: ownerId, fullname: fullName } = req.user;
    const result = await Automobile.updateOne(
      { _id: autoId },
      {
        _id: autoId,
        ...payload,
        location: [long, lat],
        owner: { ownerId: new mongoose.Types.ObjectId(ownerId), fullName },
      }
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

async function searchAutomobiles(req, res, next) {
  const { search_query } = req.body;
  try {
    console.log("search_query: ", search_query);

    const automobiles = await Automobile.find({
      $or: [
        { title: new RegExp(search_query, "gi") },
        { description: new RegExp(search_query, "gi") },
        { color: new RegExp(search_query, "gi") },
        { type: new RegExp(search_query, "gi") },
      ],
    });

    res.json({ data: automobiles });
  } catch (e) {
    next(e);
  }
}

async function searchNearByAutomobiles(req, res, next) {
  try {
      console.log('searchNearByAutomobiles req.user: ', req.user);
    
    if (!req.user) {
       console.log('no user data in req.user');
      return res.json({ data: {msg: "No loggedin user."} })
    };

    const user = await Users.findOne({ _id: req.user._id });
  
    console.log('searchNearByAutomobiles user from db: ', user);
    console.log('users long-lat: ' + user.location2.coordinates);

    //Fairfield long, lat default 
    let long = -91.973419;
    let lat = 41.006950;
    if (user.location2.coordinates && user.location2.coordinates.length > 0) {
      long = parseFloat(user.location2.coordinates[0]);
      lat = parseFloat(user.location2.coordinates[1]);
    }
  
    let automobiles = await Automobile.find({location2: {
        $near: {
            $geometry:{ 
                type: "Point", 
                coordinates: [long, lat],
                $minDistance: 0,
                $maxDistance: 500000
              }
            }
        }})

    console.log('nearby automobiles: ', automobiles)

    res.json({ data: automobiles });
  } catch (e) {
    console.log('error: ', e)
    next(e);
  }
}

module.exports = {
  getAllAutomobiles,
  addAutomobile,
  getAutoById,
  updateAutoById,
  searchAutomobiles,
  deleteAutoById,
  uploadImage,
  getMyAutomobiles,
  autoPurchasedList,
  searchNearByAutomobiles,
};
