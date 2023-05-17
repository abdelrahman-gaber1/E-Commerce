const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatormiddelware");

const getSubcatagoryvalidator = [
  check("id").isMongoId().withMessage("In Valid Subcategory Id Format"),
  validatorMiddleware,
];

const createSubcatagoryvalidator = [
  check("name")
    .isLength({ min: 2 })
    .withMessage("Too short  Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name")
    .notEmpty()
    .withMessage("Subcategory Required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("SubCategory must be belong to Category")
    .isMongoId()
    .withMessage("Invalid Category Id Format"),

  validatorMiddleware,
];

const ubdateSubcatagoryvalidator = [
  check("id").isMongoId().withMessage("In Valid Subcategory Id Format"),
  validatorMiddleware,
];

const deleteSubcatagoryvalidator = [
  check("id").isMongoId().withMessage("In Valid Subcategory Id Format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

module.exports = {
  createSubcatagoryvalidator,
  getSubcatagoryvalidator,
  ubdateSubcatagoryvalidator,
  deleteSubcatagoryvalidator,
};
