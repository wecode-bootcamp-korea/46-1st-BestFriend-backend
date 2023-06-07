const { orderDao } = require("../models");
const { v4 } = require("uuid");

const createOrder = async (userId, totalPrice) => {
  const orderNumber = v4();
  const orderId = await orderDao.createOrder(userId, orderNumber, totalPrice);

  return {
    orderNumber,
  };
};

module.exports = {
  createOrder,
};
