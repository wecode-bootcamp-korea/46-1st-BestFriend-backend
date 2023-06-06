const appDataSource = require("./dataSource");

const createReview = async (userId, productId, comment) => {
  try {
    const result = await appDataSource.query(
      `
      INSERT INTO reviews(
        user_id,
        product_id,
        comment
      ) VALUES (?, ?, ?)
      `,
      [userId, productId, comment]
    );
    return result;
  } catch (err) {
    console.log(err);
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const deleteReview = async (userId, productId) => {
  try {
    const result = await appDataSource.query(
      `
    DELETE FROM reviews
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

const getReview = async (productId) => {
  try {
    const result = await appDataSource.query(
      `
      SELECT
        reviews.product_id,
        users.name,
        reviews.comment,
        reviews.created_at
      FROM reviews
      INNER JOIN users ON users.id = reviews.user_id
      WHERE product_id = ?
      `,
      [productId]
    );
    return result;
  } catch (err) {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  createReview,
  deleteReview,
  getReview,
};
