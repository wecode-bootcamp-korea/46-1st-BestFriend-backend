const appDataSource = require("./dataSource");

const getAllMainCategory = async (mainCategoryId) => {
  try {
    const result = await appDataSource.query(
      `
    SELECT
      products.image_url,
      products.name,
      products.price
    FROM products
    JOIN sub_categories ON products.sub_category_id = sub_categories.id
    JOIN main_categories ON sub_categories.main_category_id = main_categories.id
    WHERE main_categories.id = ?
    `,
      [mainCategoryId]
    );
    return result;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getAllSubCategory = async (subCategoryId) => {
  try {
    const result = await appDataSource.query(
      `
    SELECT
      image_url,
      name,
      price
    FROM products
    WHERE sub_category_id = ?
    `,
      [subCategoryId]
    );

    return result;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  getAllMainCategory,
  getAllSubCategory,
};
