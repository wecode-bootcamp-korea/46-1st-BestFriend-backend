const { cartDao } = require("../models");

const createCart = async (userId, productId, quantity) => {
  return await cartDao.createCart(userId, productId, quantity);
};

const getCart = async (userId) => {
  return await cartDao.getCart(userId);
};

const updateCart = async (userId, productId, quantity) => {
  return await cartDao.updateCart(userId, productId, quantity);
};

const deleteCart = async (userId, productId) => {
  return await cartDao.deleteCart(userId, productId);
};

module.exports = {
  createCart,
  getCart,
  updateCart,
  deleteCart,
};
