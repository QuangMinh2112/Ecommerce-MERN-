const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expired } = req.body;
  if (!name || !discount || !expired) throw new Error("Missing input !");

  const coupon = await Coupon.create({
    ...req.body,
    expired: Date.now() + expired * +24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: coupon ? true : false,
    message: coupon ? coupon : "Can not create coupon !",
  });
});

const getAllCoupons = asyncHandler(async (req, res) => {
  const coupon = await Coupon.find();
  const count = coupon.length;
  if (coupon.length === 0) throw new Error("Coupon is empty !");

  return res.status(200).json({
    success: true,
    count,
    message: coupon,
  });
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const coupon = await Coupon.findByIdAndDelete(id);
  return res.status(200).json({
    success: coupon ? true : false,
    message: coupon
      ? "Delete coupon successfully !"
      : "Can not delete coupon !",
  });
});
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { expired } = req.body;

  const coupon = await Coupon.findByIdAndUpdate(id, {
    ...req.body,
    expired: Date.now() + expired * +24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: coupon ? true : false,
    message: coupon
      ? "Update coupon successfully !"
      : "Can not delupdate coupon !",
  });
});

module.exports = { createCoupon, getAllCoupons, deleteCoupon, updateCoupon };
