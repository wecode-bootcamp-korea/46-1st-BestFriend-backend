const { productDao } = require("../models");

const getAllMainCategory = async (subCategoryId) => {
  return await productDao.getAllSubCategory(subCategoryId);
};

const getAllSubCategory = async (subCategoryId) => {
  return await productDao.getAllSubCategory(subCategoryId);
};

module.exports = {
  getAllMainCategory,
  getAllSubCategory,
};
