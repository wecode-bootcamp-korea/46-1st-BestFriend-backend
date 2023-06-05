const express = require("express");
const likeController = require("../controllers/likeController");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("", loginRequired, likeController.createLike);
router.delete("", loginRequired, likeController.deleteLike);
router.get("", loginRequired, likeController.getLike);

module.exports = {
  router,
};
