const createError = (statusCode, message) => {
  // code
  console.log("Step 1 Create error");
  const error = new Error(message);
  error.statusCode = statusCode;

  throw error;
};

module.exports = createError;
