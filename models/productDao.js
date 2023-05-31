const appDataSource = require("./dataSource");

const getAllProducts = async (subCategoryIds) => {
  try {
    const result = await appDataSource.query(
      `
      SELECT
        image_url,
        name,
        price
      FROM products
      WHERE FIND_IN_SET(sub_category_id, ?)
    `,
      [subCategoryIds]
    );
    return result;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  getAllProducts,
};
