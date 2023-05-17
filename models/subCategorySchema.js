const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "name must be unique"],
      minlength: [2, "To Short Subcategory Name"],
      maxlength: [32, "To long Subcategory Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      // عملت بروبيرتي النوع بتاعها عباره اي دي ل نوع اسيكيما اخري
      type: mongoose.Schema.ObjectId,
      // الاسم ده نفس الاسم الي مكتوب في المونجوز موديل ""
      ref: "Category",
      required: [true, "SubCategory must be belong to parent category"],
    },
  },
  { timestamps: true }
);

const subCategoryModel = mongoose.model("subCategory", subCategorySchema);

module.exports = subCategoryModel;
