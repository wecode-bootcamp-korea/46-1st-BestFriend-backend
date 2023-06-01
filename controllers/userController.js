const { userService } = require("../services");
const { catchAsync } = require("../utils/error");

const signUp = catchAsync(async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password || !phone || !address) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

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

module.exports = {
  signUp,
  signIn,
};
