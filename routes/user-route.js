const express = require("express")
const router = express.Router()
//Import controller
const userController = require("../controllers/user-controllers")


// Endpoint http://localhost:8080/api/users
router.get("/users", userController.listUsers);
router.patch("/user/update-role", userController.updateRole);
router.delete("/user/:id", userController.deleteUser);

module.exports = router