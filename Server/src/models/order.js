const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Types.ObjectId },
        color: String,
        quantity: Number,
      },
    ],
    status: {
      type: String,
      default: "Processing",
      enum: ["Processing", "Cancled", "Successful"],
    },
    total: {
      type: Number,
    },
    coupon: {
      type: mongoose.Types.ObjectId,
      ref: "Coupon",
    },
    orderBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
