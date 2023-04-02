const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);
    if (connect.connection.readyState === 1) {
      console.log("Connect to database successfully !");
    }
  } catch (error) {
    console.log("Connect to database failed ", error);
  }
};

module.exports = connectDB;
