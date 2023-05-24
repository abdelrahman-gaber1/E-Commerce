const { check } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middlewares/validatormiddelware");
const userModel = require("../../models/userModel");

const signupvalidator = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Too short  user name")
    .notEmpty()
    .withMessage("user Required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Address Email")
    .custom((val) =>
      userModel.findOne({ email: val }).then((result) => {
        if (result) {
          return Promise.reject(new Error("Email already used"));
        }
      })
    ),
  check("phone")
    .isMobilePhone("ar-EG")
    .withMessage("Invalid Phone Number accepted only Egy")
    .optional(),
  check("password")
    .notEmpty()
    .withMessage("password Required")
    .isLength({ min: 8 })
    .withMessage("Password Must be at least 8 Character")
    .custom((password, { req }) => {
      if (password !== req.body.confirmPassword) {
        throw new Error("Password Conformation not Correct");
      }
      return true;
    }),

  check("confirmPassword").notEmpty().withMessage("confirmPassword Required"),

  validatorMiddleware,
];

const loginvalidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Address Email"),

  check("password")
    .notEmpty()
    .withMessage("password Required")
    .isLength({ min: 8 })
    .withMessage("Password Must be at least 8 Character"),
  validatorMiddleware,
];

module.exports = {
  signupvalidator,
  loginvalidator,
};
