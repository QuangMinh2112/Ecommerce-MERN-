const express = require("express");
const router = express.Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyJWT");
const controller = require("../controllers/brand");

router.post("/create", [verifyAccessToken, isAdmin], controller.createBrand);

router.get("/", controller.getAllBrand);

router.put("/:id", [verifyAccessToken, isAdmin], controller.updateBrand);

router.delete("/:id", [verifyAccessToken, isAdmin], controller.deleteBrand);

module.exports = router;
