const asyncHandler = require("express-async-handler");
const Category = require("../models/productCategory");
const slugify = require("slugify");

const create = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) throw new Error("Missing Input !");
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title, {
      replacement: "-",
      remove: undefined,
      lower: false,
      strict: false,
      locale: "vi",
      trim: true,
    });

    const category = await Category.create(req.body);
    return res.status(200).json({
      success: title ? true : false,
      message: category ? category : "Can not create new category !!!",
    });
  }
});
const categories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  if (categories.length === 0) {
    throw new Error("Category Empty !!");
  }
  return res.status(200).json({
    success: categories ? true : false,
    productCategory: categories ? categories : "Can not get all categories !!!",
  });
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) throw new Error("Missing Id Category !!!");
  const categoryRemove = await Category.findByIdAndDelete(categoryId);
  return res.status(200).json({
    success: categoryRemove ? true : false,
    message: categoryRemove
      ? "Detele category success !!!"
      : "Cannot delete category !!!",
  });
});

const update = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId || !req.body.title) throw new Error("Missing input !!!");

  const updateCategory = await Category.findByIdAndUpdate(
    categoryId,
    req.body,
    {
      new: true,
    }
  );
  return res.status(200).json({
    success: updateCategory ? true : false,
    message: updateCategory ? updateCategory : "Can not update category !!!",
  });
});

module.exports = { create, deleteCategory, categories, update };
