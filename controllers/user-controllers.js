// 1. List all User
// 2. Update Role
// 3. Delete User

exports.listUsers = async (req, res, next) => {
  // code
  try {
    res.json({ message: "Hello, List users" });
  } catch (error) {
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    res.json({ message: "Hello, Update Role" });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    res.json({ message: "Hello, Delete User" });
  } catch (error) {
    next(error);
  }
};
