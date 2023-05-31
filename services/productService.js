const { productDao } = require("../models");

const getAllProducts = async (subCategoryIds) => {
  return await productDao.getAllProducts(subCategoryIds);
};

module.exports = {
  getAllProducts,
};
