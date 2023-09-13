const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/connectDB");
const initRoutes = require("./src/routes/index");
const app = express();
dotenv.config();
connectDB();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initRoutes(app);

app.listen(port, () => {
  console.log(`Server is running port ${port} !`);
});
