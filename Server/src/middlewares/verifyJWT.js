const jwt = require("jsonwebtoken");
const asyncHandle = require("express-async-handler");
const verifyAccessToken = asyncHandle(async (req, res, next) => {
  //Bearer token
  const bearerToken = req?.headers?.authorization?.startsWith("Bearer");

  if (bearerToken) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
      if (err)
        return res.status(401).json({
          success: false,
          message: "Invalid access token",
        });
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Require authentication!!!",
    });
  }
});

//Check role Admin
const isAdmin = asyncHandle(async (req, res, next) => {
  const { role } = req.user;
  if (+role === 1)
    return res.status(401).json({
      success: false,
      message: "You are not ADMIN !",
    });
  next();
});
module.exports = { verifyAccessToken, isAdmin };
