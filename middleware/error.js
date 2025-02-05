const errorHandler = (err, req, res, next) => {
  // Code
  console.log("Step 3 handle Error")

  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal Server error" });
};

module.exports = errorHandler;
