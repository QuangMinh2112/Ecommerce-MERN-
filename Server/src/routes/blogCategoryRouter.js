const express = require("express");
const route = express.Router();
const controller = require("../controllers/blogCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyJWT");

route.get("/", controller.blogCategories);

route.post("/create", controller.create);

route.delete("/:blogCategoryId", controller.deleteBlogCategory);
route.put("/:blogCategoryId", [verifyAccessToken, isAdmin], controller.update);

module.exports = route;
