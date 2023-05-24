const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  createSubcatagoryvalidator,
  getSubcatagoryvalidator,
  ubdateSubcatagoryvalidator,
  deleteSubcatagoryvalidator,
} = require("../utils/validator/subcategoryvalidator");

const {
  createSubCatogiros,
  getsubcategory,
  getsubCatogiros,
  updateSubCategory,
  deletesubcategory,
  setCategoryIdtobody,
  createFiterObject,
} = require("../controllers/subCategoryControllers");

router
  .route("/")
  .post(setCategoryIdtobody, createSubcatagoryvalidator, createSubCatogiros)
  .get(createFiterObject, getsubCatogiros);
router
  .route("/:id")
  .get(getSubcatagoryvalidator, getsubcategory)
  .put(ubdateSubcatagoryvalidator, updateSubCategory)
  .delete(deleteSubcatagoryvalidator, deletesubcategory);

module.exports = router;
