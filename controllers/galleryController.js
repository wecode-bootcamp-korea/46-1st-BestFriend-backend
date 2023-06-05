const { galleryService } = require("../services");
const { catchAsync } = require("../utils/error");

const getGalleryList = catchAsync(async (req, res) => {
  const gallery = await galleryService.getGalleryList();

  res.status(200).json({ gallery });
});

module.exports = { getGalleryList };
