const express = require("express");
const router = express.Router();

const controller = require("../controllers/user");
router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/", controller.getAllUser);

module.exports = router;
