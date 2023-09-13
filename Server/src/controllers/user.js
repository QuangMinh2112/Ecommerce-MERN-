const User = require("../models/user");
const asyncHandle = require("express-async-handler");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const makeToken = require("uniqid");

const {
  generatorAccessToken,
  generatorRefreshToken,
} = require("../middlewares/jwt");
const sendMail = require("../utils/sendMail");
const { users } = require("../utils/constants");
// const register = asyncHandle(async (req, res) => {
//   const { firstName, lastName, mobile, email, password } = req.body;

//   if (!firstName || !lastName || !mobile || !email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "Please fill in full field !",
//     });
//   }
//   const user = await User.findOne({ email });
//   if (user) throw new Error("Email already exists! ");
//   else {
//     const newUser = await User.create(req.body);
//     if (newUser) {
//       return res.status(200).json({
//         success: newUser ? true : false,
//         message: newUser
//           ? "Register Successfully.Please go to login !"
//           : "Something went wrong !",
//       });
//     }
//   }
// });

const register = asyncHandle(async (req, res) => {
  const { firstName, lastName, email, password, mobile } = req.body;

  if (!firstName || !lastName || !email || !password || !mobile) {
    return res.status(400).json({
      success: false,
      message: "Missing input !",
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User has existed !");
  } else {
    const token = makeToken();
    const encodeEmail = btoa(email) + "@" + token;
    const newUser = await User.create({
      email: encodeEmail,
      password,
      firstName,
      lastName,
      mobile,
    });

    if (newUser) {
      const html = `<h2>Register code:<br /><blockquote>${token}</blockquote></h2>`;
      await sendMail({
        email,
        html,
        subject: "Hoàn tất đăng ký Digital World !",
      });
    }
    setTimeout(async () => {
      await User.deleteOne({ email: encodeEmail });
    }, [30000]);
    return res.status(200).json({
      success: newUser ? true : false,
      message: newUser
        ? "Please check your email to active acount !"
        : "Some thing went wrong !",
    });
  }
});

const finalRegister = asyncHandle(async (req, res) => {
  const { token } = req.params;

  const notActiveEmail = await User.findOne({ email: new RegExp(`${token}$`) });
  //new RegExp(`${token}$`)->lấy chuối sau cùng ví dụ nguyendoquangminh2112@token thì nó sẽ lấy ra token
  if (notActiveEmail) {
    notActiveEmail.email = atob(notActiveEmail?.email?.split("@")[0]);
    notActiveEmail.save();
  }
  return res.status(200).json({
    success: notActiveEmail ? true : false,
    message: notActiveEmail ? notActiveEmail : "Some thing went wrong !",
  });
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
    const { password, role, refreshToken, ...userData } = user.toObject();
    // create accessToken
    const accessToken = generatorAccessToken(user?._id, role);
    // create refreshToken
    const newRefreshToken = generatorRefreshToken(user?._id);

    // create refreshToken and save to database
    await User.findByIdAndUpdate(
      { _id: user.id },
      { refreshToken: newRefreshToken },
      { new: true }
    );
    //save refreshToken to cooke
    res.cookie("refreshToken", newRefreshToken, {
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

const getAll = asyncHandle(async (req, res) => {
  const queryObj = { ...req.query };

  const excludedFields = ["limit", "sort", "page", "fields"];

  excludedFields.forEach((el) => delete queryObj[el]);

  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );

  const formatedQueries = JSON.parse(queryString);

  if (queryObj?.name)
    formatedQueries.name = { $regex: queryObj.name, $options: "i" }; //i =>không phân biệt chữ hoa chữ thường

  if (req.query.q) {
    delete formatedQueries.q;
    formatedQueries["$or"] = [
      { firstName: { $regex: req.query.q, $options: "i" } },
      { lastName: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
    ];
  }
  let queryCommand = User.find(formatedQueries);
  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  // Field Limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  // Pagination
  const page = req.query.page || 1;
  const limit = req.query.limit || process.env.LIMIT_USER;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  //Execute query
  queryCommand?.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await User.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      users: response ? response : "Can not get all User !",
    });
  });
});

const getCurrent = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id)
    .populate({
      path: "cart",
      populate: {
        path: "product",
        select: "title thumb price quantity category",
      },
    })
    .select("-refreshToken -password");
  if (user) {
    return res.status(200).json({
      success: user ? true : false,
      user: user ? user : "User not found !",
    });
  }
});

const refreshAccessToken = asyncHandle(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies && !cookies.refreshToken)
    throw new Error("No refresh token in cookies!");

  const result = await jwt.verify(
    cookies.refreshToken,
    process.env.REFRESH_TOKEN
  );
  const response = await User.findOne({
    _id: result._id,
    refreshToken: cookies.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generatorAccessToken(response._id, response.role)
      : "User not found !",
  });
});

const logout = asyncHandle(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies && !cookies.refreshToken)
    throw new Error("No refresh token in cookies");

  await User.findOneAndUpdate(
    { refreshToken: cookies.refreshToken },
    { refreshToken: "" },
    { new: true }
  );

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res
    .status(200)
    .json({ success: true, message: "Logout successfully !!!" });
});

const forgotPassword = asyncHandle(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Missing Email !");

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found !");
  const resetToken = await user.createPasswordChangeToken();
  await user.save();

  // const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`;
  const html = `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
      rel="stylesheet"
    />
    <title>Passioncorners | Account Activation</title>
    <style>
      body {
        background-color: #333333;
        height: 100vh;
        font-family: "Roboto", sans-serif;
        color: #fff;
        position: relative;
        text-align: center;
      }
      a{
        cursor:pointer;
      }
      .container {
        max-width: 700px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
    
      }
      .wrapper {
        padding: 0 15px;
      }
      .card {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
      }
      span {
        color: #ffc107;
      }
      a{
        cursor: pointer;
        display: block;
      }
      button {
        padding: 1em 6em;
        border-radius: 5px;
        border: 0;
        background-color: hsl(45, 100%, 51%);
        transition: all 0.3s ease-in;
        cursor: pointer;
      }
      button:hover {
        background-color: hsl(45, 70%, 51%);
        transition: all 0.3s ease-in;
      }
     
    </style>
  </head>
  <body>
    <div class="container">
      <div class="wrapper">
        <div class="card">
          <h1><span>Forgot Password !</span></h1>
          <p>Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ 🙂</p>
          <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}><button>Click here !</button></a>
        </div>
      </div>
    </div>
  </body>
</html>`;
  const data = {
    email,
    html,
    subject: "Forgot password",
  };
  const rs = await sendMail(data);
  return res.status(200).json({
    success: true,
    message: rs
      ? "Thông báo đổi khẩu đã được gửi về mail của bạn , vui lòng kiểm tra mail"
      : "Gửi mail không thành công !",
  });
});

const resetPassword = asyncHandle(async (req, res) => {
  const { password, token } = req.body;
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("User not found !");

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangeAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();

  return res.status(200).json({
    success: user ? true : false,
    message: user ? "Update Password Success !" : "Something went wrong !",
  });
});

// delete-User(Admin)
const deleteUser = asyncHandle(async (req, res) => {
  const { userId } = req.params;
  if (!userId) throw new Error("Missing input !");
  const user = await User.findByIdAndDelete(userId);
  return res.status(200).json({
    success: user ? true : false,
    message: user ? `Delete User Success !` : "Something went wrong !",
  });
});

// update-CurrentUser
const updateCurrentUser = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  const { firstName, lastName, email, mobile } = req.body;
  const data = { firstName, lastName, email, mobile };
  if (req.file) data.avatar = req.file.path;
  const user = await User.findByIdAndUpdate(_id, data, {
    new: true,
  }).select("-password -role - refreshToken");
  return res.status(200).json({
    success: user ? true : false,
    message: user ? "Update successfully !!!" : "Something went wrong !!!",
  });
});

//update user by admin

const updateUserByAdmin = asyncHandle(async (req, res) => {
  const { userid } = req.params;
  const user = await User.findByIdAndUpdate(userid, req.body, {
    new: true,
  }).select("-password -role -refreshToken");

  if (!user) throw new Error(`User with id ${userid} does not exist !!!`);

  return res.status(200).json({
    success: user ? true : false,
    message: "Update user successfully !!!",
  });
});

// add address to user

const updateAdressUser = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  const { address } = req.body;
  if (!address) throw new Error("Missing input value !");
  const updateAddressUser = await User.findByIdAndUpdate(_id, {
    $push: { address: address },
  });

  return res.status(200).json({
    success: updateAddressUser ? true : false,
    message: "Update address user successfully !!!",
  });
});

const cartUser = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  const { productId, color, quantity = 1, price, thumbnail, title } = req.body;
  if (!productId || !color || !price || !thumbnail || !title)
    throw new Error("Missing input value !");
  const user = await User.findById(_id).select("cart");
  const checkAlreadyProduct = user?.cart?.find(
    (item) => item.product.toString() === productId
  );
  if (checkAlreadyProduct && checkAlreadyProduct.color === color) {
    const response = await User.updateOne(
      { cart: { $elemMatch: checkAlreadyProduct } },
      {
        $set: {
          "cart.$.quantity": quantity,
          "cart.$.price": price,
          "cart.$.thumbnail": thumbnail,
          "cart.$.title": title,
        },
      },
      { new: true }
    ); //$ là cái mà tìm đc
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Update Cart Success" : "Update cart fail !",
    });
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      {
        $push: {
          cart: {
            product: productId,
            color,
            quantity,
            price,
            thumbnail,
            title,
          },
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Update Cart Success" : "Update cart fail !",
    });
  }
});

const removeProductCart = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  const { pid, color } = req.params;
  const user = await User.findById(_id).select("cart");
  const alreadyProduct = user?.cart?.find(
    (el) => el.product.toString() === pid && el?.color === color
  );
  if (!alreadyProduct) {
    return res.status(200).json({
      success: true,
      message: "Update Your Cart",
    });
  }
  const response = await User.findByIdAndUpdate(
    _id,
    { $pull: { cart: { product: pid, color } } },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Update Your Cart" : "Some thing went wrong",
  });
});

const createUser = asyncHandle(async (req, res) => {
  const user = await User.create(users);
  return res.status(200).json({
    success: user ? true : false,
    message: user ? user : "Update cart fail !",
  });
});
module.exports = {
  register,
  login,
  getAll,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  deleteUser,
  updateCurrentUser,
  updateUserByAdmin,
  updateAdressUser,
  cartUser,
  finalRegister,
  createUser,
  removeProductCart,
};
