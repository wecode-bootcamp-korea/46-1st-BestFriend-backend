const { cartService } = require("../services");
const { catchAsync } = require("../utils/error");

const createCart = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!userId || !productId) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;

      throw error;
    }
    const createCart = await cartService.createCart(
      userId,
      productId,
      quantity
    );

    res.status(201).json({ message: "createCart" });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
  }
});

module.exports = {
  createCart,
};