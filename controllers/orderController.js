const { orderService } = require("../services");
const { catchAsync } = require("../utils/error");

const createOrder = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { totalPrice } = req.body;

  const { orderNumber, changePoint } = await orderService.createOrder(
    userId,
    totalPrice
  );

  return res.status(201).json({
    message: "ORDER_COMPLETED",
    orderNumber,
    changePoint,
  });
});

module.exports = {
  createOrder,
};
