const { galleryDao } = require("../models");

const getGalleryList = async () => {
  return await galleryDao.getGalleryList();
};

module.exports = { getGalleryList };
