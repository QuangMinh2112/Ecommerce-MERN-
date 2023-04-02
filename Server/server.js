const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/connectDB");
const initRoutes = require("./src/routes/index");
const app = express();
dotenv.config();
connectDB();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initRoutes(app);

app.listen(port, () => {
  console.log(`Server is running port ${port} !`);
});
