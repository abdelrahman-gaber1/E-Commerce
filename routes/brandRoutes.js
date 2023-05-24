const express = require("express");

const router = express.Router();
const {
  getbrandvalidator,
  ubdatebrandvalidator,
  deletebrandvalidator,
  createbrandvalidator,
} = require("../utils/validator/brandvalidator");
const {
  getBrands,
  createBrandies,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

router.route("/").get(getBrands).post(createbrandvalidator, createBrandies);
router
  .route("/:id")
  .get(getbrandvalidator, getBrand)
  .put(ubdatebrandvalidator, updateBrand)
  .delete(deletebrandvalidator, deleteBrand);
module.exports = router;
