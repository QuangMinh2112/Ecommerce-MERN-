const notFound = async (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found !`);
  next(error);
};

const errHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return res.status(statusCode).json({
    success: false,
    message: error.message,
  });
};

module.exports = { notFound, errHandler };
