const express = require("express");
const cors = require("cors");

const postRoutes = require("./routes/post");

const app = express();

app.use(express.json());
app.use(cors());

app.use(postRoutes);

app.listen(8000);
