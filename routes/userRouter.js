const express = require("express");
const { userController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.get("/order", loginRequired, userController.userInfo);

module.exports = {
  router,
};
