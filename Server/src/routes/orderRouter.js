const express = require("express");
const router = express.Router();
const controller = require("../controllers/order");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyJWT");

router.post("/", [verifyAccessToken], controller.createOrder);

router.get("/userOrder", [verifyAccessToken], controller.getUserOrder);

router.get("/", [verifyAccessToken, isAdmin], controller.getOrders);

router.put(
  "/update_status/:oId",
  [verifyAccessToken],
  controller.updateStatusOrder
);

module.exports = router;
