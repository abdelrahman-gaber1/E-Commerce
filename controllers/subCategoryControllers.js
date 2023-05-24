const subCategoryModel = require("../models/subCategorySchema");

const factory = require("./handlersFactory");

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
const getsubcategory = factory.getOne(subCategoryModel);

// Nested Route
// @route   GET /api/v1/categories/:categoryId/subcategories
const createFiterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) {
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
