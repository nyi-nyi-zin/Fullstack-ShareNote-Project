const { validationResult } = require("express-validator");

//Model
const Note = require("../models/note");

// GET/notes
exports.getNotes = (req, res, next) => {
  Note.find()
    .sort({ createdAt: -1 })
    .then((notes) => {
      return res.status(200).json({
        message: "All Notes",
        notes,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};

// POST/create
exports.createNote = (req, res, next) => {
  const { title, content } = req.body;
  console.log(req.body);
  const cover_image = req.file;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Failed",
      errorMessages: errors.array(),
    });
  }

  Note.create({
    title,
    content,
    cover_image: cover_image ? cover_image.path : "",
  })
    .then(() => {
      return res.status(201).json({
        message: "Note created",
        data: {
          title,
          content,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};

// GET/note
exports.getNote = (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then((note) => {
      return res.status(200).json({ note });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};

//Render edit page
exports.getEdit = (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then((note) => {
      return res.status(200).json(note);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};

// PATCH/note
exports.updateNote = (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  Note.findByIdAndUpdate(id, {
    title,
    content,
  })
    .then((result) => {
      res.status(200).json("Updated Successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};

// DELETE/note
exports.deleteNote = (req, res, next) => {
  const { id } = req.params;
  Note.findByIdAndDelete(id)
    .then((_) => {
      return res.status(204).json("Note Deleted");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};
