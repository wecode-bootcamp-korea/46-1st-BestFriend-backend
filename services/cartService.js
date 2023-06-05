const { cartDao } = require("../models");

const createCart = async (userId, productId, quantity) => {
  return await cartDao.createCart(userId, productId, quantity);
};

const getCart = async (userId) => {
  return await cartDao.getCart(userId);
};

const updateCart = async (userId, cartId, quantity) => {
  const updateCart = await cartDao.updateCart(userId, cartId, quantity);
  return updateCart;
};

const deleteCart = async (userId, cartId) => {
  return await cartDao.deleteCart(userId, cartId);
};

module.exports = {
  createCart,
  getCart,
  updateCart,
  deleteCart,
};
