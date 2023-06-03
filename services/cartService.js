const { cartDao } = require("../models");

const createCart = async (userId, productId, quantity) => {
  return await cartDao.createCart(userId, productId, quantity);
};

const getCart = async (userId) => {
  return await cartDao.getCart(userId);
};

module.exports = {
  createCart,
  getCart,
};
