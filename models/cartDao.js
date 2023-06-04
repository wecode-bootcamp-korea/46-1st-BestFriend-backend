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
        carts.id,
        carts.product_id,
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

const updateCart = async (userId, cartId, quantity) => {
  try {
    await appDataSource.query(
      `UPDATE carts
      SET quantity = ?
      WHERE user_id = ? AND carts.id= ?
      `,
      [quantity, userId, cartId]
    );

    return await appDataSource.query(
      `
    SELECT
      carts.id,
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
  } catch (err) {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const deleteCart = async (userId, cartId) => {
  try {
    const result = await appDataSource.query(
      `DELETE FROM carts
      WHERE user_id = ? AND carts.id = ?
      `,
      [userId, cartId]
    );
    return result;
  } catch (err) {
    console.log(err);
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  createCart,
  getCart,
  updateCart,
  deleteCart,
};
