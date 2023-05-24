const express = require("express");

const router = express.Router();
const {
  signupvalidator,
  loginvalidator,
} = require("../utils/validator/authvalidator");
const { signup, login } = require("../controllers/authControllers");

router.route("/signup").post(signupvalidator, signup);
router.route("/login").post(loginvalidator, login);

module.exports = router;
