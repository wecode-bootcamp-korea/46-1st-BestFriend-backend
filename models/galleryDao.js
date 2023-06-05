const appDataSource = require("./dataSource");

const getGalleryList = async () => {
  try {
    const result = await appDataSource.query(
      `SELECT image_url 
      FROM gallery`
    );
    return result;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = { getGalleryList };
