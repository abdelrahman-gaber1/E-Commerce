const productModel = require("../models/proudectSchema");

const factory = require("./handlersFactory");

// @desc    Get  products
// @route   GET /api/v1/products
// @access  Public
const getProducts = factory.getAll(productModel, "Products");

// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
const createProducts = factory.createOne(productModel);

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
const getproduct = factory.getOne(productModel);

// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
const updateProduct = factory.updateOne(productModel);

// @desc    Delete specific Subcategory
// @route   PUT /api/v1/Subcategories/:id
// @access  Private
const deleteProduct = factory.deleteOne(productModel);

module.exports = {
  getProducts,
  createProducts,
  updateProduct,
  getproduct,
  deleteProduct,
};
