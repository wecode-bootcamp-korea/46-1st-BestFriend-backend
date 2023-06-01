const appDataSource = require("./dataSource");

const createUser = async (name, email, password, phone, address) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
        name,
        email,
        password,
        phone,
        address
  ) VALUES (?, ?, ?, ?, ?);
  `,
      [name, email, password, phone, address]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT
        id,
        name,
        email,
        password,
        phone,
        address
      FROM users
      WHERE email = ?
      `,
      [email]
    );

    return result;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT 
        id,
        name,
        email,
        password,
        phone,
        address
      FROM users
      WHERE id = ?
    `,
      [id]
    );

    return result;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
