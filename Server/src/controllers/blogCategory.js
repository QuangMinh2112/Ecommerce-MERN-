const asyncHandler = require("express-async-handler");
const BlogCagerogy = require("../models/blogCategory");
const slugify = require("slugify");

const create = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) throw new Error("Missing Input !");
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title);
    const blogCategory = await BlogCagerogy.create(req.body);
    return res.status(200).json({
      success: blogCategory ? true : false,
      message: blogCategory ? blogCategory : "Can not create new category !!!",
    });
  }
});
const blogCategories = asyncHandler(async (req, res) => {
  const blogCategory = await BlogCagerogy.find().select("_id title slug");
  if (blogCategory.length === 0) {
    throw new Error("Category Empty !!");
  }
  return res.status(200).json({
    success: blogCategory ? true : false,
    message: blogCategory ? blogCategory : "Can not get all categories !!!",
  });
});
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { blogCategoryId } = req.params;
  if (!blogCategoryId) throw new Error("Missing Id Category !!!");
  const blogCategoryRemove = await BlogCagerogy.findByIdAndDelete(
    blogCategoryId
  );
  return res.status(200).json({
    success: blogCategoryRemove ? true : false,
    message: blogCategoryRemove
      ? "Detele category success !!!"
      : "Cannot delete category !!!",
  });
});

const update = asyncHandler(async (req, res) => {
  const { blogCategoryId } = req.params;
  if (!blogCategoryId || !req.body.title) throw new Error("Missing input !!!");

  const updateBlogCategory = await BlogCagerogy.findByIdAndUpdate(
    blogCategoryId,
    req.body,
    {
      new: true,
    }
  );
  return res.status(200).json({
    success: updateBlogCategory ? true : false,
    message: updateBlogCategory
      ? updateBlogCategory
      : "Can not update category !!!",
  });
});

module.exports = { create, deleteBlogCategory, blogCategories, update };
