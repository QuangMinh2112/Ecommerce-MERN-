const express = require("express");
const router = express.Router();

const controller = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyJWT");
const fileUploader = require("../config/cloudinary.config");

router.post("/register", controller.register);
router.post("/mock", controller.createUser);
router.put("/finalRegister/:token", controller.finalRegister);

router.post("/login", controller.login);

router.get("/", controller.getAll);

router.get("/current", verifyAccessToken, controller.getCurrent);

router.post("/refreshToken", controller.refreshAccessToken);

router.post("/logout", controller.logout);

router.post("/forgotPassword", controller.forgotPassword);

router.put("/cart", [verifyAccessToken], controller.cartUser);
router.delete(
  "/remove-cart/:pid/:color",
  [verifyAccessToken],
  controller.removeProductCart
);

router.put("/address", [verifyAccessToken], controller.updateAdressUser);

router.put("/resetPassword", controller.resetPassword);

router.delete("/:userId", [verifyAccessToken, isAdmin], controller.deleteUser);

router.put(
  "/current",
  verifyAccessToken,
  fileUploader.single("avatar"),
  controller.updateCurrentUser
);
router.put(
  "/:userid",
  verifyAccessToken,
  isAdmin,
  controller.updateUserByAdmin
);
module.exports = router;
