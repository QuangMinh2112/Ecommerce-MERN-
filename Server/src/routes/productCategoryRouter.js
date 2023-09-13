const express = require("express");
const route = express.Router();
const controller = require("../controllers/productCategory");

route.get("/", controller.categories);

route.post("/create", controller.create);

route.delete("/:categoryId", controller.deleteCategory);
route.put("/:categoryId", controller.update);

module.exports = route;
