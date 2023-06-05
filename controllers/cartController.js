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

const getCart = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;

    const carts = await cartService.getCart(userId);

    res.status(200).json({ carts });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
  }
});

const updateCart = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartId } = req.params;
    const { quantity } = req.body;

    if (!userId || !cartId || !quantity) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const updateCart = await cartService.updateCart(userId, cartId, quantity);

    res.status(200).json({ updateCart });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
  }
});

const deleteCart = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartId } = req.params;

    await cartService.deleteCart(userId, cartId);

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
  }
});

module.exports = {
  createCart,
  getCart,
  updateCart,
  deleteCart,
};
