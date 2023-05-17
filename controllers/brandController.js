const BrandModel = require("../models/brandmodel");

const factory = require("./handlersFactory");

// @desc    Get  Brands
// @route   GET /api/v1/brands
// @access  Public
const getBrands = factory.getAll(BrandModel);

// @desc    Create Brand
// @route   POST  /api/v1/Brand
// @access  Private
const createBrandies = factory.createOne(BrandModel);

// @desc    Get specific Brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
const getBrand = factory.getOne(BrandModel);

// @desc    Update specific Brand
// @route   PUT /api/v1/brands/:id
// @access  Private
const updateBrand = factory.updateOne(BrandModel);

// @desc    Delete specific Subcategory
// @route   PUT /api/v1/Subcategories/:id
// @access  Private
const deleteBrand = factory.deleteOne(BrandModel);

module.exports = {
  getBrands,
  createBrandies,
  getBrand,
  updateBrand,
  deleteBrand,
};
