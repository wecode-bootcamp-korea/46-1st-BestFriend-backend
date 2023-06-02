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

module.exports = {
  createCart,
};
