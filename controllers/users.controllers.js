const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/users.model.js");
const saltRounds = 10;
const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET;

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log("login() - email: " + email);

    const user = await Users.findOne({ email: email });

    console.log("user found from db: ", user);

    //if user does not exists, return by sending response
    if (user == null || user == undefined) {
      res.json(createInvalidUserResponseData());
    }
    //if user exisits then compare hash and send resonse
    if (user && isMatchedPasswordHash(password, user)) {
      console.log("User's password hash is matched.");
      res.json(createJWTokenAndResponseData(user));
    } else {
      console.log("No user matched.");
      res.json(createInvalidUserResponseData());
    }
  } catch (error) {
    next(error);
  }
};

module.exports.singup = async (req, res, next) => {
  try {
    console.log("singup - body: ", req.body);
    const newUser = new Users(req.body);
    const isUserExist = await isUserEmailExistInDb(newUser);
    if (!isUserExist) {
      const passHash = await bcrypt.hash(newUser.password, saltRounds);
      newUser.password = passHash;
      //TODO: make it dynamic, Fairfield default long, lat
      //newUser.location = { type: "Point", coordinates: [-91.973419,41.006950]}
      const result = await newUser.save();
      console.log("new user saved result: ", result);
      res.json(createJWTokenAndResponseData(result));
    } else {
      res.json({
        success: false,
        data: { msg: "Email is aready used!!!" },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    console.log("getAllUsers()");
    const result = await Users.find({});
    console.log("getAllUsers: ", result);
    res.json({ sucess: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log("getUserById() - user_id: ", user_id);
    const result = await Users.find({ _id: user_id });
    res.json({ sucess: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    if(!req.user) throw new Error("test -update JWT verification is failed. JWT token is required.");
    const { user_id } = req.user;
    console.log("udateUser() - user_id: ", user_id);
    const result = await Users.updateOne({ _id: user_id },req.body);
    res.json({ sucess: true, data: result });
  } catch (error) {
    next(error);
  }
};

function createJWTokenAndResponseData(user) {
  console.log("createJWTokenAndResponseData()", user);

  const userTokenInfo = {
    _id: user._id, email: user.email,
    fullname: user.fullname,
    location: user.location
  };

  userTokenInfo.jwt = jwt.sign({ ...userTokenInfo }, JWT_SIGN_SECRET);

  return {
    success: true,
    data: userTokenInfo,
  };
}

function createInvalidUserResponseData() {
  return { success: false, data: { msg: "Invalid email or password." } };
}

async function isMatchedPasswordHash(password, user) {
  try {
    return await bcrypt.compare(password, user.password);
  } catch (err) {
    next(err);
  }
}

async function isUserEmailExistInDb(newUser) {
  try {
    const oldUser = await Users.findOne({ email: newUser.email });
    console.log('isUserEmailExistsInDb() - oldUser', oldUser)
    if (oldUser != null && oldUser.email === newUser.email) {
      console.log('email exists')
      return true;
    }
    else
      return false;
  } catch (err) {
    next(err);
  }
}
