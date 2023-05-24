const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatormiddelware");

const getcatagoryvalidator = [
  check("id").isMongoId().withMessage("In Valid Category Id Format"),
  validatorMiddleware,
];

const createcatagoryvalidator = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Too short  category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name")
    .notEmpty()
    .withMessage("Category Required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

const ubdatecatagoryvalidator = [
  check("id").isMongoId().withMessage("In Valid Category Id Format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

const deletecatagoryvalidator = [
  check("id").isMongoId().withMessage("In Valid Category Id Format"),
  validatorMiddleware,
];

module.exports = {
  getcatagoryvalidator,
  ubdatecatagoryvalidator,
  deletecatagoryvalidator,
  createcatagoryvalidator,
};
