const { productService } = require("../services");
const { catchAsync } = require("../utils/error");

const getAllProducts = catchAsync(async (req, res) => {
  const subCategoryIds = req.query["sub-category-ids"];

  const products = await productService.getAllProducts(subCategoryIds);

  res.status(200).json(products);
});

const getProductsById = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const product = await productService.getProductsById(productId);

  res.status(200).json({ product });
});

module.exports = {
  getAllProducts,
  getProductsById,
};
