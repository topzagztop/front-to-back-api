const createError = require("../utils/createError");

exports.register = (req, res, next) => {
  try {
    res.json({ message: "Register Successfully" });
  } catch (err) {
    next(err)
  }
};

exports.login = (req, res, next) => {
  try {
    // console.log(aaa)
    res.json({ message: "Hello Login" });
  } catch (err) {
    next(err)
  }
};
