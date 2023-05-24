const express = require("express");

const router = express.Router();
const {
  getcatagoryvalidator,
  ubdatecatagoryvalidator,
  deletecatagoryvalidator,
  createcatagoryvalidator,
} = require("../utils/validator/categoryvalidator");
const {
  getCatogiros,
  createCatogiros,
  getcategory,
  updateCategory,
  deletecategory,
} = require("../controllers/catagepryController");

const subCategoryRoutes = require("./subCategoryRoutes");
router.use("/:categoryId/subcategories", subCategoryRoutes);

router
  .route("/")
  .get(getCatogiros)
  .post(createcatagoryvalidator, createCatogiros);
router
  .route("/:id")
  .get(getcatagoryvalidator, getcategory)
  .put(ubdatecatagoryvalidator, updateCategory)
  .delete(deletecatagoryvalidator, deletecategory);
module.exports = router;
