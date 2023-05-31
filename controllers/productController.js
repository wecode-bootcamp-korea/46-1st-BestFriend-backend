const { productService } = require("../services");
const { catchAsync } = require("../utils/error");

const getAllMainCategory = catchAsync(async (req, res) => {
  const mainCategoryId = req.params.main_category_id;

  const products = await productService.getAllMainCategory(mainCategoryId);

  res.status(200).json(products);
});

const getAllSubCategory = catchAsync(async (req, res) => {
  const subCategoryId = req.params.sub_category_id;

  const products = await productService.getAllSubCategory(subCategoryId);

  res.status(200).json(products);
});

module.exports = {
  getAllMainCategory,
  getAllSubCategory,
};
