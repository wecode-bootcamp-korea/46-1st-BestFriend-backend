const { cartDao } = require("../models");

const createCart = async (userId, productId, quantity) => {
  return await cartDao.createCart(userId, productId, quantity);
};

module.exports = {
  createCart,
};
