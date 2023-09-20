const asyncHandler = require("express-async-handler");
const Blog = require("../models/blog");
const createBlog = asyncHandler(async (req, res) => {
  const { title, category, description, images } = req.body;
  if (!title || !category || !description) throw new Error("Missing Input !");

  const newBlog = await Blog.create(req.body);
  return res.status(200).json({
    success: newBlog ? true : false,
    message: newBlog ? newBlog : "Can not create new blog",
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .populate("likes", "firstName lastName")
    .populate("disLikes", "firstName lastName");
  if (blogs.length === 0) throw new Error("Blog is empty !");
  return res.status(200).json({
    success: blogs.length > 0 ? true : false,
    message: blogs,
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });
  return res.status(200).json({
    success: blog ? true : false,
    message: blog ? "Update blog success !!!" : "Can not update blog !",
  });
});
const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blog.findByIdAndDelete(blogId);
  if (!blog) throw new Error("Blog not found !");
  return res.status(200).json({
    success: blog ? true : false,
    message: blog ? "Delete blog success !!!" : "Can not delete blog !",
  });
});

const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { blogId } = req.body;

  const blog = await Blog.findById(blogId);
  const isCheckedAlreadyDisliked = blog?.disLikes?.find(
    (item) => item.toString() === _id
  );
  //kiểm tra xem người dùng đã dislike hay chưa , nếu dislike thì trả likes là :false và ngược lại
  if (isCheckedAlreadyDisliked) {
    const response = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { disLikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response,
    });
  }

  const isCheckedAlreadyLiked = blog?.likes?.find(
    (item) => item.toString() === _id
  );

  if (isCheckedAlreadyLiked) {
    const response = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { likes: _id } },
      { new: true }
    );

    return res.status(200).json({
      success: response ? true : false,
      message: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      blogId,
      { $push: { likes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response,
    });
  }
});
const disLikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { blogId } = req.body;

  const blog = await Blog.findById(blogId);
  const isCheckedAlreadyLike = blog?.likes?.find(
    (item) => item.toString() === _id
  );
  //kiểm tra xem người dùng đã dislike hay chưa , nếu dislike thì trả likes là :false và ngược lại
  if (isCheckedAlreadyLike) {
    const response = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response,
    });
  }

  const isCheckedAlreadyDisliked = blog?.disLikes?.find(
    (item) => item.toString() === _id
  );

  if (isCheckedAlreadyDisliked) {
    const response = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { disLikes: _id } },
      { new: true }
    );

    return res.status(200).json({
      success: response ? true : false,
      message: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      blogId,
      { $push: { disLikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response,
    });
  }
});
const getDetailBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findByIdAndUpdate(
    blogId,
    { $inc: { numberViews: 1 } },
    { new: true }
  )
    .populate("disLikes", "firstName lastName")
    .populate("likes", "firstName lastName");
  if (!blog) throw new Error("Blog not found !");

  return res.status(200).json({
    success: blog ? true : false,
    message: blog || "Something went wrong!",
  });
});
const uploadImageBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findByIdAndUpdate(
    blogId,
    { images: req.file.path },
    { new: true }
  );

  return res.status(200).json({
    success: blog ? true : false,
    message: blog
      ? "Upload image successfully !"
      : "Can not upload blog image !",
  });
});
module.exports = {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  getDetailBlog,
  uploadImageBlog,
};
