const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your firstName !"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your lastName !"],
    },
    email: {
      type: String,
      required: [true, "Please enter your Email !"],
      unique: true,
      // validate: [validator.isEmail, "Please Enter a valid Email !"],
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [1, 2],
      default: 1,
    },
    avatar: {
      type: String,
      // default:'https://img.freepik.com/free-icon/user_318-159711.jpg'
    },
    cart: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: Number,
        color: String,
        price: Number,
        thumbnail: String,
        title: String,
      },
    ],
    address: {
      type: Array,
      default: [],
    },
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    passwordChangeAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods = {
  isComparePassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
  createPasswordChangeToken: async function () {
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;

    return resetToken;
  },
};

//Export the model
module.exports = mongoose.model("User", userSchema);
