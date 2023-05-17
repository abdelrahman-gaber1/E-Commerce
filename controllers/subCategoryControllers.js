const subCategoryModel = require("../models/subCategorySchema");

const factory = require("./handlersFactory");

// محتاج اضيف ال اي دي للكاتيجوري قبل ما اعمل فاليديشن
// فا عملت ميديل وير جديده
const setCategoryIdtobody = (req, res, next) => {
  // Nested Route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc    Create subcategory
// @route   POST  /api/v1/subcategories
// @access  Private
const createSubCatogiros = factory.createOne(subCategoryModel);

// @desc    Get specific Subcategory by id
// @route   GET /api/v1/Subcategories/:id
// @access  Public
// .populate({ path: "category", select: "name-_id" });
const getsubcategory = factory.getOne(subCategoryModel);

// اكسيس راوت من خلال راوت تاني
// Nested Route
// محتاج كل الساب كاتيجوريز الي بتنتمي للكتيجوري اي دي ده
// @route   GET /api/v1/categories/:categoryId/subcategories
const createFiterObject = (req, res, next) => {
  // لاحظ لو مش باعتلي اي دي في البرام الفيلتر هيفضل فاضي
  let filterObject = {};
  if (req.params.categoryId) {
    // دي معناها ايه بقي يا معلم ان لو بعتلك في البرام كاتيجوري اي دي هتستخدمه بحيث تظهر
    // الساب كاتيجوري الخاصه بالكاتيجوري ده بس
    filterObject = { category: req.params.categoryId };
  }
  req.filterObject = filterObject;
  next();
};

// @desc    Get list of subcategory
// @route   GET /api/v1/subcategories
// @access  Public
const getsubCatogiros = factory.getAll(subCategoryModel);

// @desc    Update specific Subcategory
// @route   PUT /api/v1/Subcategories/:id
// @access  Private
const updateSubCategory = factory.updateOne(subCategoryModel);

// @desc    Delete specific Subcategory
// @route   PUT /api/v1/Subcategories/:id
// @access  Private
const deletesubcategory = factory.deleteOne(subCategoryModel);

module.exports = {
  createSubCatogiros,
  getsubcategory,
  getsubCatogiros,
  updateSubCategory,
  deletesubcategory,
  setCategoryIdtobody,
  createFiterObject,
};
