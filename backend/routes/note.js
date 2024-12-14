const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const noteController = require("../controllers/note");

// GET/notes
router.get("/notes", noteController.getNotes);

// POST/notes
router.post(
  "/create",
  [
    body("title")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please Enter More Than 3 Words")
      .isLength({ max: 30 })
      .withMessage("Please Enter Less Than 30 Words"),
    body("content")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please Enter More Than 3 Words"),
  ],
  noteController.createNote
);

// GET/note/:id
router.get("/note/:id", noteController.getNote);

// Render edith page
router.get("/edit/:id", noteController.getEdit);

// UPDATE/note/:id
router.patch("/update/:id", noteController.updateNote);

// DELETE/
router.delete("/delete/:id", noteController.deleteNote);

module.exports = router;
