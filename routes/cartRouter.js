const express = require("express");
const cartController = require("../controllers/cartController");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("", loginRequired, cartController.createCart);
router.get("", loginRequired, cartController.getCart);
router.patch("/:cartId", loginRequired, cartController.updateCart);
router.delete("/:cartId", loginRequired, cartController.deleteCart);

module.exports = {
  router,
};
