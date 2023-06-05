const { galleryService } = require("../services");
const { catchAsync } = require("../utils/error");

const getGalleryList = catchAsync(async (req, res) => {
  const galleries = await galleryService.getGalleryList();

  res.status(200).json({ galleries });
});

module.exports = { getGalleryList };
