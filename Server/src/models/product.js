const mongoose = require("mongoose");

var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    thumb: {
      type: String,
      required: true,
    },

    description: {
      type: Array,
      required: true,
    },
    images: {
      type: Array,
    },
    brand: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        comment: { type: String },
        updatedAt: { type: Date },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
    variants: [
      {
        title: String,
        color: String,
        price: Number,
        images: Array,
        thumb: String,
        sku: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
