const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

//Model
const User = require("../models/user");

// GET/register
exports.getRegister = (req, res, next) => {};

//POST/regis
exports.postRegister = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Failed",
      errorMessages: errors.array(),
    });
  }

  const { email, password, username } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashPassword) => {
      return User.create({
        email,
        password: hashPassword,
        username,
      });
    })
    .then((result) => {
      res.status(201).json({
        message: "User created",
        userId: result._id,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong",
      });
      console.log(err);
    });
};

// GET/login
exports.getLogin = (req, res, next) => {};

// POST/login
exports.postLogin = (req, res, next) => {};
