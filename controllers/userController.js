const { userService } = require("../services");
const { catchAsync } = require("../utils/error");

const signUp = catchAsync(async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password || !phone || !address) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }

  const existingUser = await userService.getUserByEmail(email);
  if (existingUser) {
    const error = new Error("Duplicate email");
    error.statusCode = 409;
    throw error;
  }

  await userService.signUp(name, email, password, phone, address);

  res.status(201).json({ message: "user is created" });
});

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const accessToken = await userService.signIn(email, password);

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

const userInfo = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const userInfo = await userService.userInfo(userId);

  return res.json(userInfo);
});

module.exports = {
  signUp,
  signIn,
  userInfo,
};
