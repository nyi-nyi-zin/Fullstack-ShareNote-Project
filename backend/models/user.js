const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: {
    type: Schema.Types.ObjectId,
    ref: "Note",
  },
});

const userModel = model("User", userSchema);

module.exports = userModel;
