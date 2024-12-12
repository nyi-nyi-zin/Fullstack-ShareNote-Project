const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const noteRoute = require("./routes/note");

app.use(express.json());
app.use(cors());
app.use(noteRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(8000);
    console.log("Connect to Mongodb & running at Port 8000");
  })
  .catch((err) => console.log("error connecting mongodb" + err));
