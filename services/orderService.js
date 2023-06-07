const { orderDao, userDao } = require("../models");
const { v4 } = require("uuid");

const createOrder = async (userId, totalPrice) => {
  const orderNumber = v4();
  const { response } = await orderDao.createOrder(
    userId,
    orderNumber,
    totalPrice
  );

  const { orderId, changePoint } = response;

  return {
    orderNumber,
    changePoint,
  };
};

module.exports = {
  createOrder,
};
