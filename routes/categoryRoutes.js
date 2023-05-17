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

//بعمل راوت
// router.get("/", getCatogiros);
// router.post("/", createCatogiros);

const subCategoryRoutes = require("./subCategoryRoutes");
// لما يجيلك راوت بالشكل ده روح علي الساب كاتيجوري راوت
router.use("/:categoryId/subcategories", subCategoryRoutes);

// بدل السطرين الي فوق دول
// بمعني اي راوت علي المسار ده اعمله الميثود دي
router
  .route("/")
  .get(getCatogiros)
  .post(createcatagoryvalidator, createCatogiros);
// لاحظ الاسم ده لازم يبقي نفس اسم الكونستنت بتاع ال برامس
router
  .route("/:id")
  .get(getcatagoryvalidator, getcategory)
  .put(ubdatecatagoryvalidator, updateCategory)
  .delete(deletecatagoryvalidator, deletecategory);
module.exports = router;
