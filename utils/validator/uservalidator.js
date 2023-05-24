const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middlewares/validatormiddelware");
const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const getuservalidator = [
  check("id").isMongoId().withMessage("In Valid user Id Format"),
  validatorMiddleware,
];

const createuservalidator = [
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

  check("profileImg").optional(),
  check("role").optional(),

  validatorMiddleware,
];

const ubdateuservalidator = [
  check("id").isMongoId().withMessage("In Valid user Id Format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  check("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Address Email")
    .custom(
      (val) =>
        userModel.findOne({ email: val }).then((result) => {
          if (result) {
            return Promise.reject(new Error("Email already used"));
          }
        }),
      check("profileImg").optional(),
      check("role").optional()
    ),
  check("phone")
    .isMobilePhone("ar-EG")
    .withMessage("Invalid Phone Number accepted only Egy")
    .optional(),

  validatorMiddleware,
];

const deleteuservalidator = [
  check("id").isMongoId().withMessage("In Valid user Id Format"),
  validatorMiddleware,
];

const changeUserPasswordValidator = [
  check("id").isMongoId().withMessage("In Valid user Id Format"),

  check("currentPassword")
    .notEmpty()
    .withMessage("must Insert Current Password"),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("must Insert Confirm Password"),

  check("password")
    .notEmpty()
    .withMessage("must Insert Password")
    .custom(async (val, { req }) => {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        throw new Error("this user not found");
      }
      const isCorrect = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrect) {
        throw new Error("Incorrect Current Password");
      }
      if (val !== req.body.confirmPassword) {
        throw new Error("Password Conformation not Correct");
      }
      return true;
    }),
  validatorMiddleware,
];

module.exports = {
  getuservalidator,
  ubdateuservalidator,
  deleteuservalidator,
  createuservalidator,
  changeUserPasswordValidator,
};
