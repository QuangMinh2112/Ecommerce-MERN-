const asyncHandler = require("express-async-handler");
const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  if (!coupon) throw new Error("Missing input value !");
  const cartUser = await User.findById(_id)
    .select("cart")
    .populate("cart.product", "title price");
  const products = cartUser?.cart.map((item) => ({
    product: item.product._id,
    count: item.quantity,
    color: item.color,
  }));
  let total = cartUser?.cart?.reduce(
    (sum, item) => item.product.price * item.quantity + sum,
    0
  );
  const createData = { products, total, orderBy: _id };
  if (coupon) {
    const couponCode = await Coupon.findById(coupon);
    total =
      Math.round((total * (1 - +couponCode.discount / 100)) / 1000) * 1000 ||
      total;
    createData.total = total;
    createData.coupon = coupon;
  }
  const result = await Order.create(createData);
  return res.status(200).json({
    success: result ? true : false,
    message: result,
  });
});
const updateStatusOrder = asyncHandler(async (req, res) => {
  const { oId } = req.params;
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(
    oId,
    {
      status,
    },
    { new: true }
  );

  return res.status(200).json({
    success: order ? true : false,
    message: order ? order : "Update status failed !",
  });
});

const getUserOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const order = await Order.find({ orderBy: _id });
  if (!order) throw new Error("Order not found !");
  return res.status(200).json({
    success: order ? true : false,
    message: order ? order : "Can not find order !",
  });
});

//get order by admin

const getOrders = asyncHandler(async (req, res) => {
  const order = await Order.find();

  if (!order.length === 0) throw new Error("Order is empty !");

  return res.status(200).json({
    success: order ? true : false,
    message: order,
  });
});
module.exports = { createOrder, updateStatusOrder, getUserOrder, getOrders };
