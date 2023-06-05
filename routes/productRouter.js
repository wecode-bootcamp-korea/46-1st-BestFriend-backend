const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("", productController.getProductList);
router.get("/:productId", productController.getProductsById);

module.exports = {
  router,
};
