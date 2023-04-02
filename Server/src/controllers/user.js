const User = require("../models/user");
const asyncHandle = require("express-async-handler");
const {
  generatorAccessToken,
  generatorRefreshToken,
} = require("../middlewares/jwt");
const register = asyncHandle(async (req, res) => {
  const { firstName, lastName, mobile, email, password } = req.body;

  if (!firstName || !lastName || !mobile || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in full field !",
    });
  }
  const user = await User.findOne({ email });
  if (user) throw new Error("Email already exists! ");
  else {
    const newUser = await User.create(req.body);
    if (newUser) {
      return res.status(200).json({
        success: newUser ? true : false,
        newUser,
      });
    }
  }
});

const login = asyncHandle(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in full field !",
    });
  }
  const user = await User.findOne({ email });
  if (user && (await user.isComparePassword(password))) {
    //get password and role , only return for user is userData
    const { password, role, ...userData } = user.toObject();
    // create accessToken
    const accessToken = generatorAccessToken(user?._id, role);
    // create refreshToken
    const refreshToken = generatorRefreshToken(user?._id);

    // create refreshToken and save to database
    await User.findByIdAndUpdate(
      { _id: user.id },
      { refreshToken: refreshToken },
      { new: true }
    );
    //save refreshToken to cooke
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //return data for user
    return res.status(200).json({
      success: true,
      message: userData,
      accessToken,
    });
  } else {
    throw new Error("Wrong email or password !");
  }
});

const getAllUser = asyncHandle(async (req, res) => {
  const response = await User.find();
  if (response.length === 0) {
    throw new Error("Don't have any users in the database !");
  }
  return res.status(200).json({
    success: response ? true : false,
    message: response,
  });
});
module.exports = { register, login, getAllUser };
