## Server

## Step 1 create package
```bash
npm init -y
```

## Step 2 install package....
```bash
npm install express nodemon cors morgan bcryptjs jsonwebtoken zod prisma
```
```bash
npx prisma init
```

## Step 3 Error Middleware
/middleware/error.js

```js
const errorHandler = (err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ message: err.statusCode || "Internal Server error" });
};

module.exports = errorHandler;
```

/midleware/not-found.js
```js
const notFound = (req, res, next) => {
    res.status(400).json({message: "Resource not found this server"})
}

module.exports = notFound
```

/utils/createError.js
```bash
const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;

  throw error;
};

module.exports = createError;
```

## Step 4 auth Login Register
/routes/auth-routes.js
```js
const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");

// Endpoint http://localhost:8080/api/register
router.post("/register", authControllers.register);
// Endpoint http://localhost:8080/api/login
router.post("/login", authControllers.login);

module.exports = router;
```

/controllers/auth-controllers.js
```js
const createError = require("../utils/createError");

exports.register = (req, res, next) => {
  try {
    res.json({ message: "Register Successfully" });
  } catch (err) {
    console.log(err);
    createError(500, "Server is Error!!!");
  }
};

exports.login = (req, res, next) => {
  try {
    res.json({ message: "Hello Login" });
  } catch (err) {
    console.log(err.message);
    createError(500, "Server is Error!!!");
  }
};
```

when update code in Github
```bash
git add .
git commit -m "message"
git push
```

## Step 5 Validate with zod
/middlewares/validators.js
```js
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

module.exports = router;

```
/routes/auth-routes.js
```js
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
```

