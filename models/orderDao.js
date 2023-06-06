const appDataSource = require("./dataSource");

const getOrderUserInfo = async (userId) => {
  try {
    const result = await appDataSource.query(
      `
      SELECT
        name,
        address,
        phone,
        point
      FROM users
      WHERE id =?`,
      [userId]
    );

    return result;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const createOrder = async (userId, orderNumber, totalPrice) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    let userPoint = await appDataSource.query(
      `SELECT point FROM users WHERE id =?`,
      [userId]
    );
    userPoint = userPoint[0].point;

    if (totalPrice > userPoint) {
      const error = new Error("NEED_POINT_CHARGE");
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

    for (const cartItem of cartItems) {
      const { product_id, quantity, price } = cartItem;
      const product_total_price = quantity * price;

      await queryRunner.query(
        `
        INSERT INTO order_items(
          order_id,
          product_id,
          quantity,
          total_price
        ) VALUES(?, ?, ?, ?)`,
        [orderId, product_id, quantity, product_total_price]
      );
    }

    const changePoint = userPoint - totalPrice;

    await queryRunner.query(
      `
      UPDATE users SET point = ? WHERE id =?`,
      [changePoint, userId]
    );

    await queryRunner.query(
      `
      DELETE FROM carts WHERE user_id = ?`,
      [userId]
    );

    await queryRunner.commitTransaction();

    return {
      orderId,
    };
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  getOrderUserInfo,
  createOrder,
};
