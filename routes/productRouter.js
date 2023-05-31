const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get(
  "/maincategory/:main_category_id",
  productController.getAllMainCategory
);

router.get(
  "/subcategory/:sub_category_id",
  productController.getAllSubCategory
);

module.exports = {
  router,
};
