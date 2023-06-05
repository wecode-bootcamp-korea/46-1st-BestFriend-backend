const { productService } = require("../services");
const { catchAsync } = require("../utils/error");

const getProductsById = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const product = await productService.getProductsById(productId);

  res.status(200).json({ product });
});

const getProductList = catchAsync(async (req, res) => {
  const {
    subCategoryId,
    isFlowerIncluded,
    isBerryIncluded,
    search,
    orderBy,
    offset,
    limit,
  } = req.query;

  const products = await productService.getProductList(
    subCategoryId,
    isFlowerIncluded,
    isBerryIncluded,
    search,
    orderBy,
    offset,
    limit
  );

  res.status(200).json(products);
});

module.exports = {
  getProductsById,
  getProductList,
};
