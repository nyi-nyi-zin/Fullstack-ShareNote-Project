const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

//Model
const User = require("../models/user");

// GET/register
exports.getRegister = (req, res, next) => {};

//POST/register
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

// POST/login
exports.postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation Failed",
        errorMessages: errors.array(),
      });
    }
    const { email, password } = req.body;

    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(401).json({
        message: "Email not exists",
      });
    }
    const isMatch = bcrypt.compareSync(password, userDoc.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Please CHeck your credentials",
      });
    }
    return res.status(200).json({ message: "Login Success" });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
