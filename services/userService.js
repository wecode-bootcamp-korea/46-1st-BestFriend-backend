const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userDao } = require("../models");

const hashPassword = async (plaintextPassword) => {
  const saltRounds = 10;

  return bcrypt.hash(plaintextPassword, saltRounds);
};

const getUserById = async (id) => {
  return await userDao.getUserById(id);
};

const getUserByEmail = async (email) => {
  return await userDao.getUserByEmail(email);
};

const signUp = async (name, email, password, phone, address) => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  if (!emailRegex.test(email)) {
    const error = new Error("INVALID_USER");
    error.statusCode = 400;

    throw error;
  }

  if (!passwordRegex.test(password)) {
    const error = new Error("INVALID_USER");
    error.statusCode = 400;

    throw error;
  }

  const hashedPassword = await hashPassword(password);
  const createUser = await userDao.createUser(
    name,
    email,
    hashedPassword,
    phone,
    address
  );
  return createUser;
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const error = new Error("INVALID_USER");
    error.statusCode = 401;

    throw error;
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    const error = new Error("INVALID_USER");
    error.statusCode = 401;

    throw error;
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  return accessToken;
};

const userInfo = async (userId) => {
  return await userDao.userInfo(userId);
};

module.exports = {
  signUp,
  getUserById,
  getUserByEmail,
  signIn,
  userInfo,
};
