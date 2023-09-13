const asyncHandle = require("express-async-handler");
const Product = require("../models/product");
const slugify = require("slugify");
const makeSKU = require("uniqid");

const createProduct = asyncHandle(async (req, res) => {
  const { title, price, description, color, quantity, category, brand } =
    req.body;
  const thumb = req.files.thumb[0].path;
  const images = req.files.images.map((el) => el.path);
  if (thumb) req.body.thumb = thumb;
  if (images) req.body.images = images;

  // if(!(title && price && description && color && quantity && category && brand)) {
  //   throw new Error("Missing Input !")
  // }

  req.body.slug = slugify(title, {
    replacement: "-",
    remove: undefined,
    lower: false,
    strict: false,
    locale: "vi",
    trim: true,
  });
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    message: newProduct
      ? "Create Product Success !"
      : "Can not create product!",
  });
});

const getDetailProduct = asyncHandle(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId).populate({
    path: "ratings",
    populate: {
      path: "postedBy",
      select: "firstName lastName avatar",
    },
  });
  return res.status(200).json({
    success: product ? true : false,
    message: product ? product : "Can not get detail product!",
  });
});
const getAllProduct = asyncHandle(async (req, res) => {
  const queryObj = { ...req.query };

  //Tach cac truong dac biet ra khoi query
  const excludedFields = ["limit", "sort", "page", "fields"];

  excludedFields.forEach((el) => delete queryObj[el]);

  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );

  const formatedQueries = JSON.parse(queryString);
  let colorQueryObject;
  // Filter
  if (queryObj?.title)
    formatedQueries.title = { $regex: queryObj.title, $options: "i" }; //i =>không phân biệt chữ hoa chữ thường
  if (queryObj?.category)
    formatedQueries.category = { $regex: queryObj.category, $options: "i" };
  if (queryObj?.color) {
    delete formatedQueries.color;
    const colorArr = queryObj.color.split(",");
    const colorQuery = colorArr?.map((item) => ({
      color: { $regex: item, $options: "i" },
    }));
    colorQueryObject = { $or: colorQuery };
  }
  //search product admin
  let queryObject = {};
  if (queryObj?.q) {
    delete formatedQueries.q;
    queryObject = {
      $or: [
        { title: { $regex: queryObj.q, $options: "i" } },
        { color: { $regex: queryObj.q, $options: "i" } },
        { brand: { $regex: queryObj.q, $options: "i" } },
      ],
    };
  }
  const searchResult = {
    ...colorQueryObject,
    ...formatedQueries,
    ...queryObject,
  };
  let queryCommand = Product.find(searchResult);
  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  // Field Limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  // Pagination
  const page = req.query.page || 1;
  const limit = req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  //Execute query
  queryCommand?.exec(async (err, response) => {
    // if (err) throw new Error(err.message);
    const counts = await Product.find(searchResult).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      products: response ? response : "Can not get product !",
    });
  });
});
const deleteProduct = asyncHandle(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndDelete(productId);

  return res.status(200).json({
    success: product ? true : false,
    message: product
      ? "Delete product successfully !"
      : "Can not delete product !",
  });
});

const updateProduct = asyncHandle(async (req, res) => {
  const { productId } = req.params;
  const files = req?.files;
  if (files?.thumb) req.body.thumb = files.thumb[0].path;
  if (files?.images) req.body.images = files.images.map((el) => el.path);
  if (req.body.title && req.body) req.body.slug = slugify(req.body.title);
  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: product ? true : false,
    message: product
      ? "Product updated successfully !"
      : "Can not update product !",
  });
});
const ratings = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, productId, updatedAt } = req.body;
  if (!star || !productId) throw new Error("Missing Input Values !");
  const ratingProduct = await Product.findById(productId);
  const checkAlreadyRatings = ratingProduct?.ratings?.find(
    (item) => item.postedBy.toString() === _id
  );
  if (checkAlreadyRatings) {
    // update rating
    await Product.updateOne(
      {
        ratings: { $elemMatch: checkAlreadyRatings }, //$elemMatch => kiểm tra xem mảng có chưa ít nhất 1 phần tử hay không nếu chứa thì update phần tử đó lại chứ không tạo phần thử mới
      },
      {
        $set: {
          "ratings.$.star": star,
          "ratings.$.comment": comment,
          "ratings.$.updatedAt": updatedAt,
        },
      },
      { new: true }
    );
  } else {
    await Product.findByIdAndUpdate(productId, {
      $push: { ratings: { star, comment, postedBy: _id, updatedAt } },
    });
  }

  //Sum ratings
  const updateProduct = await Product.findById(productId);
  const ratingCount = updateProduct.ratings.length;
  const sumRatings = updateProduct.ratings.reduce(
    (sum, item) => sum + item.star,
    0
  );
  updateProduct.totalRatings = Math.round((sumRatings * 10) / ratingCount) / 10;
  await updateProduct.save();
  return res.status(200).json({
    success: true,
    updateProduct,
  });
});

const uploadImageProduct = asyncHandle(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndUpdate(productId, {
    $push: { images: { $each: req.files?.map((item) => item.path) } },
  });

  return res.status(200).json({
    success: product ? true : false,
    message: product
      ? "Upload image product successfully !"
      : "Can not upload image product !",
  });
});
const addVariant = asyncHandle(async (req, res) => {
  const { productId } = req.params;
  const { title, price, color } = req.body;
  if (!(title && price && color)) throw new Error("Missing Input !");
  const thumb = req.files.thumb[0].path;
  const images = req.files.images.map((el) => el.path);
  const response = await Product.findByIdAndUpdate(
    productId,
    {
      $push: {
        variants: {
          color,
          price,
          title,
          thumb,
          images,
          sku: makeSKU().toUpperCase(),
        },
      },
    },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Add variant success !" : "Something went wrong!",
  });
});
module.exports = {
  createProduct,
  deleteProduct,
  getDetailProduct,
  getAllProduct,
  updateProduct,
  ratings,
  uploadImageProduct,
  addVariant,
};
