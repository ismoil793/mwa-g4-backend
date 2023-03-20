const path = require("path");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const favicon = require("serve-favicon");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const usersRouter = require("./routers/users.router.js");
const verifyJwtToken = require("./middlewares/user.autherization.js");
const automobileRouter = require("./routers/automobile.router");

const app = express();
app.use(cors());

(async function () {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected!");
  } catch (e) {
    console.log(`MongoDB connection error ${e}`);
  }
})();

app.disable("x-powered-by");
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
app.use(
  morgan("common", {
    stream: fs.createWriteStream("./access.log", { flags: "a" }),
  })
);
app.use(morgan("dev"));

app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
app.use(express.json());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/automobiles", verifyJwtToken, automobileRouter);

app.all("*", (req, res, next) => {
  const error = new Error("No route found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status || 500).json({
    success: false,
    data: error.message,
    status,
  });
});

app.listen(3001, () => console.log(`listening on 3001`));
