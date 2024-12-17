const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controllers/auth");

const User = require("../models/user");

// GET/register
router.get("/register", authController.getRegister);

// POST/register
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter Valid Email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDocument) => {
          if (userDocument) {
            return Promise.reject("Email already exist");
          }
        });
      }),
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username is too short")
      .isLength({ max: 10 })
      .withMessage("username is too long")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDocument) => {
          if (userDocument) {
            return Promise.reject("username already exist");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password is too short"),
  ],

  authController.postRegister
);

// GET/login
router.get("/login", authController.getLogin);

// POST/login
router.post("/login", authController.postLogin);

module.exports = router;
