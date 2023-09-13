const express = require("express");
const router = express.Router();
const controller = require("../controllers/blog");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyJWT");
const upload = require("../config/cloudinary.config");

router.get("/", [verifyAccessToken, isAdmin], controller.getBlogs);

router.post("/create", [verifyAccessToken, isAdmin], controller.createBlog);

router.post("/like", [verifyAccessToken], controller.likeBlog);

router.post("/dislike", [verifyAccessToken], controller.disLikeBlog);

router.put("/:blogId", [verifyAccessToken, isAdmin], controller.updateBlog);

router.put(
  "/upload-images/:blogId",
  [verifyAccessToken, isAdmin],
  upload.single("image"),
  controller.uploadImageBlog
);

router.delete("/:blogId", [verifyAccessToken, isAdmin], controller.deleteBlog);

router.get(
  "/details/:blogId",
  [verifyAccessToken, isAdmin],
  controller.getDetailBlog
);

module.exports = router;
