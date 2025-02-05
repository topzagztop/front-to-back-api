const createError = require("../utils/createError");

exports.register = (req, res, next) => {
  try {
    // Code
    // Step 1 req.body
    const { email, firstname, lastname, password, confirmPassword } = req.body;
    console.log(email, firstname, lastname, password, confirmPassword);
    // Step 2 validate
    if (!email) {
      return createError(400, "Email is require")
    }
    if (!firstname) {
      return createError(400, "Firstname is require")
    }
    // Step 3 Check already
    // Step 4 Encrypt bcrypt
    // Step 5 Insert to DB
    // Step 6 Response
    res.json({ message: "Register Successfully" });

  } catch (err) {
    console.log('Step 2 Catch')
    next(err);
  }
};

exports.login = (req, res, next) => {
  try {
    // console.log(aaa)
    res.json({ message: "Hello Login" });
  } catch (err) {
    next(err);
  }
};
