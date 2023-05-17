const mongoose = require("mongoose");

// 1- Create Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // بحيث لو مكتبش الاسم يطلعله الرساله دي
      required: [true, "Category Required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    //بتحول اسم الكاتيجوري لاسم ممكن نستخدمه في ال يو ار ال
    // A and B => a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  //  هتعملي 2 فيلد في الداتا بيز
  // created at + updated at
  // من خلالها اقدر اوصل للمنجات الاحدث
  { timestamps: true }
);

// 2- Create model
// Category اسم الموديل في الداتا بيز
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
