const { productDao } = require("../models");

const getAllProducts = async (subCategoryIds) => {
  return await productDao.getAllProducts(subCategoryIds);
};

const getProducts = async (productId) => {
  return await productDao.getProducts(productId);
};

module.exports = {
  getAllProducts,
  getProducts,
};
