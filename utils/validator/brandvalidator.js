const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middlewares/validatormiddelware");

const getbrandvalidator = [
  check("id").isMongoId().withMessage("In Valid Brand Id Format"),
  validatorMiddleware,
];

const createbrandvalidator = [
  check("name")
    .isLength({ min: 2 })
    .withMessage("Too short  Brand name")
    .isLength({ max: 32 })
    .withMessage("Too long Brand name")
    .notEmpty()
    .withMessage("Brand Required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

const ubdatebrandvalidator = [
  check("id").isMongoId().withMessage("In Valid Brand Id Format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

const deletebrandvalidator = [
  check("id").isMongoId().withMessage("In Valid Brand Id Format"),
  validatorMiddleware,
];

module.exports = {
  getbrandvalidator,
  ubdatebrandvalidator,
  deletebrandvalidator,
  createbrandvalidator,
};
