const { likeService } = require("../services");
const { catchAsync } = require("../utils/error");

const createLike = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  if (!userId || !productId) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }
  const createLike = await likeService.createLike(userId, productId);

  res.status(201).json({ message: "createLike" });
});

const deleteLike = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const deleteLike = await likeService.deleteLike(userId, productId);

  res.status(204).json({ message: "deleteLike" });
});

const getLike = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const Like = await likeService.getLike(userId);

  res.status(200).json({ Like });
});

module.exports = {
  createLike,
  deleteLike,
  getLike,
};
