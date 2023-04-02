const jwt = require("jsonwebtoken");

const generatorAccessToken = (id, role) =>
  jwt.sign({ _id: id, role }, process.env.ACCESS_TOKEN, { expiresIn: "3d" });

const generatorRefreshToken = (id) =>
  jwt.sign({ _id: id }, process.env.REFRESH_TOKEN, { expiresIn: "7d" });
module.exports = { generatorAccessToken, generatorRefreshToken };
