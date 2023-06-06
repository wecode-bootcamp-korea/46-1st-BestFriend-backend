const { orderService } = require("../services");
const { catchAsync } = require("../utils/error");

const getOrderUserInfo = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const userInfo = await orderService.getOrderUserInfo(userId);

  return res.json(userInfo);
});

const createOrder = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { totalPrice } = req.body;

  const { message, orderNumber } = await orderService.createOrder(
    userId,
    totalPrice
  );

  return res.status(201).json({
    message,
    orderNumber,
  });
});

module.exports = {
  getOrderUserInfo,
  createOrder,
};
