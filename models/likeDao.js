const appDataSource = require("./dataSource");

const createLike = async (userId, productId) => {
  try {
    const result = await appDataSource.query(
      `
      INSERT INTO likes(
        user_id,
        product_id
      ) VALUES (?, ?)
      `,
      [userId, productId]
    );
    return result;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const deleteLike = async (userId, productId) => {
  try {
    const result = await appDataSource.query(
      `
    DELETE FROM likes
    WHERE user_id = ? AND product_id = ?
    `,
      [userId, productId]
    );
    return result;
  } catch (err) {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getLike = async (userId) => {
  try {
    const result = await appDataSource.query(
      `
    SELECT
      products.sub_category_id,
      products.id,
      products.name,
      products.image_url,
      products.price
    FROM likes
    INNER JOIN products ON products.id = likes.product_id
    WHERE likes.user_id = ?
      `,
      [userId]
    );
    return result;
  } catch (err) {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  createLike,
  deleteLike,
  getLike,
};
