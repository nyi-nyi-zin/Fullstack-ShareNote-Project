const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      required: true,
      minLength: 3,
      maxLength: 100,
      type: String,
    },
    content: {
      required: true,
      minLength: 3,
      type: String,
    },
    cover_image: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const noteModel = model("Note", noteSchema);

module.exports = noteModel;
