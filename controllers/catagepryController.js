// slugify('some string') // some-string
// if you prefer something other than '-' as separator
// slugify('some string', '_')  // some_string
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
// بدل ما تعمل كاتش في ال اسينك فانكشن  (asyncHandler)  علشان نكاتش الايرور بنستخدم
const createCatogiros = factory.createOne(CategoryModel);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
// علشان ابعت ايرور بستخدم نيسكت علشان ابعته للجلوبال هاندلر
const getcategory = factory.getOne(CategoryModel);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
const updateCategory = factory.updateOne(CategoryModel);

// @desc    Delete specific Subcategory
// @route   PUT /api/v1/Subcategories/:id
// @access  Private
const deletecategory = factory.deleteOne(CategoryModel);

// هنمسك ال ايرور الي راجع من الاكسبريس و اهندله واتحكم فيه واعمله كوستمايسيشن علشان ارجعه بالشكل الي محتاجه
// asyncHandler (async) =>  express error handler => send to console
// asyncHandler if there is error in async await he will send it to express error handler

module.exports = {
  getCatogiros,
  createCatogiros,
  getcategory,
  updateCategory,
  deletecategory,
};
