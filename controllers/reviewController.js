const { reviewService } = require("../services");
const { catchAsync } = require("../utils/error");

const createReview = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { comment } = req.body;

  const createReview = await reviewService.createReview(
    userId,
    productId,
    comment
  );

  res.status(201).json({ message: "Create Review" });
});

const deleteReview = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { reviewId } = req.params;

  const deleteReview = await reviewService.deleteReview(userId, reviewId);

  res.status(204).json();
});

const getReview = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const Review = await reviewService.getReview(productId);

  res.status(200).json({ Review });
});

module.exports = {
  createReview,
  deleteReview,
  getReview,
};
