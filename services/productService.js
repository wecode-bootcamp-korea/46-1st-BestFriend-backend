const { productDao } = require("../models");

const getProductsById = async (productId) => {
  return await productDao.getProductsById(productId);
};

const getProductList = async (
  subCategoryId,
  isFlowerIncluded,
  isBerryIncluded,
  search,
  orderBy,
  offset,
  limit
) => {
  return await productDao.getProductList(
    subCategoryId,
    isFlowerIncluded,
    isBerryIncluded,
    search,
    orderBy,
    offset,
    limit
  );
};

module.exports = {
  getProductsById,
  getProductList,
};
