const express = require("express");
const router = express.Router();
const controller = require("../controllers/insertData");

router.post("/", controller.insertProduct);
router.post("/productCategory", controller.insertProductCategory);
module.exports = router;
