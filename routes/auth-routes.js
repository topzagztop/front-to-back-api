const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");

// Endpoint http://localhost:8080/api/register
router.post("/register", authControllers.register);
// Endpoint http://localhost:8080/api/login
router.post("/login", authControllers.login);

module.exports = router;
