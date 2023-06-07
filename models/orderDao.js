const appDataSource = require("./dataSource");

const createOrder = async (userId, orderNumber, totalPrice) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    let [userPoint] = await appDataSource.query(
      `SELECT point FROM users WHERE id =?`,
      [userId]
    );
    userPoint = userPoint.point;

    if (totalPrice > userPoint) {
      const error = new Error("NOT_ENOUGH_POINTS");
      error.statusCode = 400;

      throw error;
    }

    const insertResult = await queryRunner.query(
      `
    INSERT INTO orders(
      user_id,
      order_number,
      total_price
    ) VALUES(?, ?, ?)`,
      [userId, orderNumber, totalPrice]
    );

    const orderId = insertResult.insertId;

    const cartItems = await queryRunner.query(
      `
      SELECT
        c.product_id,
        c.quantity,
        p.price
      FROM carts c
      INNER JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?`,
      [userId]
    );

    const orderItemsValues = cartItems.map((cartItem) => {
      const { product_id, quantity, price } = cartItem;
      const product_total_price = quantity * price;
      return [orderId, product_id, quantity, product_total_price];
    });

    await queryRunner.query(
      `
      INSERT INTO order_items (
        order_id,
        product_id,
        quantity,
        total_price
      ) VALUES ?`,
      [orderItemsValues]
    );

    const changePoint = userPoint - totalPrice;

    await queryRunner.query(
      `
      UPDATE users SET point = ? WHERE id =?`,
      [changePoint, userId]
    );

    await queryRunner.query(
      `
      DELETE FROM carts WHERE user_id = ? AND product_id IN (
        SELECT product_id FROM order_items WHERE order_id = ?
      )`,
      [userId, orderId]
    );

    const response = {
      orderId,
      changePoint,
    };

    await queryRunner.commitTransaction();

    return {
      response,
    };
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  createOrder,
};
