// validationResult ناتج الفاليديشن هيتحط هنا
const { validationResult } = require("express-validator");
// لو لا هبدا اكاتش ال ايرور من خلال الميديل وير الي بتكاتش ال ايرور

const validatorMiddleware = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  next();
};

module.exports = validatorMiddleware;
