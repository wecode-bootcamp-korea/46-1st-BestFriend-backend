const { orderDao } = require("../models");
const { v4 } = require("uuid");

const getOrderUserInfo = async (userId) => {
  return await orderDao.getOrderUserInfo(userId);
};

const createOrder = async (userId, totalPrice) => {
  const orderNumber = v4();
  const orderId = await orderDao.createOrder(userId, orderNumber, totalPrice);

  return {
    orderNumber,
    message: "ORDER_COMPLETED",
  };
};

module.exports = {
  getOrderUserInfo,
  createOrder,
};
