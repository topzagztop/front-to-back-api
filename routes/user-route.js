const express = require("express")
const router = express.Router()
//Import controller
const userController = require("../controllers/user-controllers")
const { authCheck } = require("../middleware/auth-middleware")


// Endpoint http://localhost:8080/api/users
router.get("/users", userController.listUsers);
router.patch("/user/update-role", authCheck, userController.updateRole);
router.delete("/user/:id", authCheck, userController.deleteUser);

module.exports = router