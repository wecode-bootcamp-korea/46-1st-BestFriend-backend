const appDataSource = require("./dataSource");

const createCart = async (userId, productId, quantity) => {
  try {
    const result = await appDataSource.query(
      `
      INSERT INTO carts(
        user_id,
        product_id,
        quantity
      ) VALUE (?, ?, ?)
      `,
      [userId, productId, quantity]
    );
    return result;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getCart = async (userId) => {
  try {
    const result = await appDataSource.query(
      `
      SELECT
        products.name,
        products.image_url,
        products.price,
        carts.quantity
      FROM carts
      INNER JOIN products ON products.id = carts.product_id
      WHERE user_id = ?
      `,
      [userId]
    );
    return result;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  createCart,
  getCart,
};
