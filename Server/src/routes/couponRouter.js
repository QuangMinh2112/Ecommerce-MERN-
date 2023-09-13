const express = require("express");
const router = express.Router();
const controller = require("../controllers/coupon");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyJWT");

router.post("/create", [verifyAccessToken, isAdmin], controller.createCoupon);

router.get("/", [verifyAccessToken, isAdmin], controller.getAllCoupons);

router.delete("/:id", [verifyAccessToken, isAdmin], controller.deleteCoupon);

router.put("/:id", [verifyAccessToken, isAdmin], controller.updateCoupon);

module.exports = router;
