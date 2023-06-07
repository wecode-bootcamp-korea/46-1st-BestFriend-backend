const express = require("express");
const router = express.Router();

const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const galleryRouter = require("./galleryRouter");
const likeRouter = require("./likeRouter");
const reviewRouter = require("./reviewRouter");
const orderRouter = require("./orderRouter");

router.use("/products", productRouter.router);
router.use("/users", userRouter.router);
router.use("/carts", cartRouter.router);
router.use("/galleries", galleryRouter.router);
router.use("/likes", likeRouter.router);
router.use("/reviews", reviewRouter.router);
router.use("/orders", orderRouter.router);

module.exports = router;
