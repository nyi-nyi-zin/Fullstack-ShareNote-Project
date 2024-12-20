const { validationResult } = require("express-validator");

//Model
const Note = require("../models/note");

//Utils
const { unlink } = require("../utils/unlink");

// GET/notes
exports.getNotes = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 6;
  let totalNotes;
  let totalPages;

  Note.find()
    .countDocuments()
    .then((counts) => {
      totalNotes = counts;
      totalPages = Math.ceil(totalNotes / perPage);
      return Note.find()
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((notes) => {
      return res.status(200).json({
        notes,
        totalNotes,
        totalPages,
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
    author: req.userId,
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
    .populate("author", "username")
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
      if (note.author.toString() !== req.userId) {
        return res.status(401).json("Auth Fail");
      }
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
  const cover_image = req.file;

  Note.findById(id)
    .then((note) => {
      if (note.author.toString() !== req.userId) {
        return res.status(401).json("Auth Fail");
      }

      note.title = title;
      note.content = content;
      if (cover_image) {
        unlink(note.cover_image);
        note.cover_image = cover_image.path;
      }
      return note.save();
    })
    .then(() => {
      return res.status(200).json("Updated Successfully");
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
  Note.findById(id)
    .then((note) => {
      if (note.author.toString() !== req.userId) {
        return res.status(401).json("Auth Fail");
      }
      if (note.cover_image) {
        unlink(note.cover_image);
      }
      return Note.findByIdAndDelete(id).then(() => {
        return res.status(204).json("Note Deleted");
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};
