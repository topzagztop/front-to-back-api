const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const {
  validateWithZod,
  registerSchema,
  loginSchema,
} = require("../middleware/validators");

// Endpoint http://localhost:8080/api/register
router.post(
  "/register",
  validateWithZod(registerSchema),
  authControllers.register
);
// Endpoint http://localhost:8080/api/login
router.post("/login", validateWithZod(loginSchema), authControllers.login);

router.get("/current-user", authControllers.currentUser)

module.exports = router;
