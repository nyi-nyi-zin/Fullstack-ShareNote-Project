const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const noteRoute = require("./routes/note");

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

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  multer({
    storage: storageConfiguration,
    fileFilter: filterConfiguration,
  }).single("cover_image")
);

app.use(noteRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(8000);
    console.log("Connect to Mongodb & running at Port 8000");
  })
  .catch((err) => console.log("error connecting mongodb" + err));
