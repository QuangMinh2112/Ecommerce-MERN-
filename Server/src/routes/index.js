// Declare
const { notFound, errHandler } = require("../middlewares/errorHandler");
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const productCategoryRouter = require("./productCategoryRouter");
const blogCategoryRouter = require("./blogCategoryRouter");
const blogRouter = require("./blogRouter");
const brandRouter = require("./brandRouter");
const couponRouter = require("./couponRouter");
const orderRouter = require("./orderRouter");
const insert = require("./insert");

// Init route
const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/productCategory", productCategoryRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/blogcategory", blogCategoryRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/coupon", couponRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/insert", insert);

  //middleware custom error
  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
