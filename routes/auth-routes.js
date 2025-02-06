const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const {
  validateWithZod,
  registerSchema,
  loginSchema,
} = require("../middleware/validators");
const { authCheck } = require("../middleware/auth-middleware");

// Endpoint http://localhost:8080/api/register
router.post(
  "/register",
  validateWithZod(registerSchema),
  authControllers.register
);
// Endpoint http://localhost:8080/api/login
router.post("/login", validateWithZod(loginSchema), authControllers.login);

router.get("/current-user", authCheck, authControllers.currentUser)

module.exports = router;
