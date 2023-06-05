const express = require("express");
const router = express.Router();

const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const galleryRouter = require("./galleryRouter");
const likeRouter = require("./likeRouter");

router.use("/products", productRouter.router);
router.use("/users", userRouter.router);
router.use("/carts", cartRouter.router);
router.use("/gallery", galleryRouter.router);
router.use("/likes", likeRouter.router);

module.exports = router;
