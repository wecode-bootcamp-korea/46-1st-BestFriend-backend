const express = require("express");
const galleryController = require("../controllers/galleryController");

const router = express.Router();

router.get("", galleryController.getGalleryList);

module.exports = {
  router,
};
