const express = require("express");

const router = express.Router();
const {
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
  createProductValidator,
} = require("../utils/validator/productvalidator");
const {
  getProducts,
  createProducts,
  getproduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.route("/").get(getProducts).post(createProductValidator, createProducts);
router
  .route("/:id")
  .get(getProductValidator, getproduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);
module.exports = router;
