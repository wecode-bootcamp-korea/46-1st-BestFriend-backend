const express = require("express");
const reviewController = require("../controllers/reviewController");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("/:productId", loginRequired, reviewController.createReview);
router.delete("/:reviewId", loginRequired, reviewController.deleteReview);
router.get("/:productId", reviewController.getReview);

module.exports = {
  router,
};
