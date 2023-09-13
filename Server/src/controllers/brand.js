const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name && Object.keys(req.body).length === 0)
    throw new Error("Missing input !");
  if (req.body && req.body.name) {
    req.body.slug = slugify(req.body.name);
    const brand = await Brand.create(req.body);
    return res.status(200).json({
      success: brand ? true : false,
      message: brand ? brand : "Can not create new brand !",
    });
  }
});

const getAllBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.find().select("_id name slug");
  const count = brand.length;
  if (brand.length === 0) throw new Error("Brand is empty !");
  return res.status(200).json({
    success: brand ? true : false,
    count,
    message: brand ? brand : "Can not get all brand !",
  });
});

const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) throw new Error("Missing input !");
  const brand = await Brand.findByIdAndUpdate(id, req.body, { new: true });
  if (!brand) throw new Error("Brand not found!");

  return res.status(200).json({
    success: brand ? true : false,
    message: brand ? brand : "Can not update brand !",
  });
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) throw new Error("Brand not found!");
  return res.status(200).json({
    success: brand ? true : false,
    message: brand ? brand : "Can not delete brand !",
  });
});

module.exports = {
  createBrand,
  getAllBrand,
  updateBrand,
  deleteBrand,
};
