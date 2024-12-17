//Load dotenv
require("dotenv").config();

//Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");

//Express initialize
const app = express();

//Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Route import
const noteRoute = require("./routes/note");
const authRoute = require("./routes/auth");

//File upload setup
const storageConfiguration = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, suffix + "-" + file.originalname);
  },
});
const filterConfiguration = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};
app.use(
  multer({
    storage: storageConfiguration,
    fileFilter: filterConfiguration,
  }).single("cover_image")
);

//Routes register
app.use(noteRoute);
app.use(authRoute);

//Database & server start
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(8000);
    console.log("Connect to Mongodb & running at Port 8000");
  })
  .catch((err) => console.log("error connecting mongodb" + err));
