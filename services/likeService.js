const { likeDao } = require("../models");

const createLike = async (userId, productId) => {
  return await likeDao.createLike(userId, productId);
};

const deleteLike = async (userId, productId) => {
  return await likeDao.deleteLike(userId, productId);
};

const getLike = async (userId) => {
  return await likeDao.getLike(userId);
};

module.exports = {
  createLike,
  deleteLike,
  getLike,
};
