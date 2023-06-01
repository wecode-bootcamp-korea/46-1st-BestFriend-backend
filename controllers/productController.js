const { productService } = require("../services");
const { catchAsync } = require("../utils/error");

const getAllProducts = catchAsync(async (req, res) => {
  const subCategoryIds = req.query["sub-category-ids"];

  const products = await productService.getAllProducts(subCategoryIds);

  res.status(200).json(products);
});

const getProducts = catchAsync(async (req, res) => {
  const productId = req.params.productId;

  const product = await productService.getProducts(productId);

  res.status(200).json({ product });
});

module.exports = {
  getAllProducts,
  getProducts,
};
