const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation failed",
        message: err.message,
        stack: err.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "Resource not found",
        message: err.message,
        stack: err.stack,
      });
      break;

    case constants.INTERNAL_SERVER_ERROR:
      res.json({
        title: "Server error",
        message: err.message,
        stack: err.stack,
      });
      break;

    default:
      res.json({
        title: "Unknown error",
        message: err.message,
        stack: err.stack,
      });
      break;
  }

  next(err);
};

module.exports = errorHandler;
