const express = require("express");
const router = express.Router();
const controller = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyJWT");
const fileUploader = require("../config/cloudinary.config");

router.post(
  "/create",
  fileUploader.fields([
    { name: "thumb", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  [verifyAccessToken, isAdmin],
  controller.createProduct
);

router.get("/", controller.getAllProduct);

router.put("/ratings", verifyAccessToken, controller.ratings);

router.get("/:productId", controller.getDetailProduct);

router.put(
  "/upload-images/:productId",
  [verifyAccessToken, isAdmin],
  fileUploader.array("images", 10),
  controller.uploadImageProduct
);

router.delete(
  "/:productId",
  [verifyAccessToken, isAdmin],
  controller.deleteProduct
);
router.put(
  "/:productId",
  fileUploader.fields([
    { name: "thumb", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  [verifyAccessToken, isAdmin],
  controller.updateProduct
);
router.put(
  "/variant/:productId",
  fileUploader.fields([
    { name: "thumb", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  [verifyAccessToken, isAdmin],
  controller.addVariant
);

module.exports = router;
