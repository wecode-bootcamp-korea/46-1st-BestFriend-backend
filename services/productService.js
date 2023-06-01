const { productDao } = require("../models");

const getAllProducts = async (subCategoryIds) => {
  return await productDao.getAllProducts(subCategoryIds);
};

const getProductsById = async (productId) => {
  return await productDao.getProductsById(productId);
};

module.exports = {
  getAllProducts,
  getProductsById,
};
