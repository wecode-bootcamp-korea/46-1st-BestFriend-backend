const express = require("express");
const router = express.Router();

const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const galleryRouter = require("./galleryRouter");

router.use("/products", productRouter.router);
router.use("/users", userRouter.router);
router.use("/carts", cartRouter.router);
router.use("/gallery", galleryRouter.router);

module.exports = router;
