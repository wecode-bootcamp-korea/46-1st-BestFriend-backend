const { reviewDao } = require("../models");

const createReview = async (userId, productId, comment) => {
  return await reviewDao.createReview(userId, productId, comment);
};

const deleteReview = async (userId, reviewId) => {
  return await reviewDao.deleteReview(userId, reviewId);
};

const getReview = async (productId) => {
  return await reviewDao.getReview(productId);
};

module.exports = {
  createReview,
  deleteReview,
  getReview,
};
