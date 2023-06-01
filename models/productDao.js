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

const getProductsById = async (productId) => {
  try {
    const result = await appDataSource.query(
      `
      SELECT
        sub_categories.name as sub_category_name,
        products.image_url,
        products.name,
        products.description,
        products.price
      FROM products
      INNER JOIN sub_categories ON sub_categories.id = products.sub_category_id
      WHERE products.id = ?
    `,
      [productId]
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
  getProductsById,
};
