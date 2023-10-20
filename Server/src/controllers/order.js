const asyncHandler = require("express-async-handler");
const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { products, total, address, status } = req.body;
  if (address) {
    await User.findByIdAndUpdate(_id, { address, cart: [] });
  }
  const data = { products, total, postedBy: _id };
  if (status) data.status = status;
  const result = await Order.create(data);
  return res.status(200).json({
    success: result ? true : false,
    message: result ? result : "Something went wrong !",
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
