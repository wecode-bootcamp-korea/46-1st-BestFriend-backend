const express = require("express");
const cartController = require("../controllers/cartController");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("", loginRequired, cartController.createCart);
router.get("", loginRequired, cartController.getCart);
router.patch("", loginRequired, cartController.updateCart);

module.exports = {
  router,
};
