const asyncHandler = require("express-async-handler");

const errorHandler = asyncHandler(async (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
  });
  next();
});

module.exports = errorHandler;
