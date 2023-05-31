const { productService } = require("../services");
const { catchAsync } = require("../utils/error");

const getAllProducts = catchAsync(async (req, res) => {
  const subCategoryIds = req.query["sub-category-ids"];

  const products = await productService.getAllProducts(subCategoryIds);

  res.status(200).json(products);
});

module.exports = {
  getAllProducts,
};
