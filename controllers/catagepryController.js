const slugify = require("slugify");

const CategoryModel = require("../models/catagorymodel");

const factory = require("./handlersFactory");

// @desc    Get  category
// @route   GET /api/v1/categories/:id
// @access  Public
const getCatogiros = factory.getAll(CategoryModel);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
const createCatogiros = factory.createOne(CategoryModel);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
const getcategory = factory.getOne(CategoryModel);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
const updateCategory = factory.updateOne(CategoryModel);

// @desc    Delete specific Subcategory
// @route   PUT /api/v1/Subcategories/:id
// @access  Private
const deletecategory = factory.deleteOne(CategoryModel);

module.exports = {
  getCatogiros,
  createCatogiros,
  getcategory,
  updateCategory,
  deletecategory,
};
