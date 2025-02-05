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
const { z } = require("zod");
// npm i zod
// TEST Validator
exports.registerSchema = z
  .object({
    email: z.string().email("Email ไม่ถูกต้อง"),
    firstname: z.string().min(3, "Firstname ต้องมากกว่า 3 อักขระ"),
    lastname: z.string().min(3, "Lastname ต้องมากกว่า 3 อักขระ"),
    password: z.string().min(6, "Password ต้องมากกว่า 6 อักขระ"),
    confirmPassword: z.string().min(6, "Confirm Password ต้องมากกว่า 6 อักขระ"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password ไม่ตรงกัน",
    path: ["confirmPassword"],
  });

exports.loginSchema = z.object({
  email: z.string().email("Email ไม่ถูกต้อง"),
  password: z.string().min(6, "Password ต้องมากกว่า 6 อักขระ"),
});

exports.validateWithZod = (schema) => (req, res, next) => {
  try {
    console.log("Hello middleware");
    schema.parse(req.body);
    next();
  } catch (err) {
    const errMsg = err.errors.map((item) => item.message);
    const errTxt = errMsg.join(",");
    const mergeError = new Error(errTxt);
    next(mergeError);
  }
};

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

## Step 6 Prisma
```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  USER
}

model Profile {
  id              Int      @id @default(autoincrement())
  email           String   @unique
  password        String
  firstname       String
  lastname        String
  role            Role     @default(USER)
  createdAt       DateTime @default(now())
  updated         DateTime @updatedAt

  // @@map("profile")
}
```

## Step 7 configs Prisma
/configs/prisma.js
```js
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = prisma
```
## Step 8 Register
/controllers/auth-controllers.js
```js
const prisma = require("../configs/prisma")
const bcrypt = require("bcryptjs")

exports.register = async (req, res, next) => {
  try {
    // Code
    // Step 1 req.body
    const { email, firstname, lastname, password, confirmPassword } = req.body;
    // Step 2 validate
    // Step 3 Check already
    const checkEmail = await prisma.profile.findFirst({
      where: {
        email: email,
      },
    });
    console.log(checkEmail);
    if (checkEmail) {
        return createError(400, "Email is already exits!!!")
    }
    // Step 4 Encrypt bcrypt
    // const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Step 5 Insert to DB
    const profile = await prisma.profile.create({
        data: {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: hashedPassword
        }
    })
    // Step 6 Response
    res.json({ message: "Register Successfully" });

  } catch (err) {
    console.log('Step 2 Catch')
    next(err);
  }
};
```

## Step 9 Login
/controllers/auth-controllers.js
```js
exports.login = async (req, res, next) => {
  try {
    // Step 1 req.body
    const { email, password } = req.body;
    // Step 2 check email and password
    const profile = await prisma.profile.findFirst({
      where: {
        email: email,
      },
    });

    if (!profile) {
      return createError(400, "Email and password is invalid!!");
    }

    const isMatch = bcrypt.compareSync(password, profile.password);

    if (!isMatch) {
      return createError(400, "Email and password is invalid!!");
    }

    // Step 3 Generate token
    const payload = {
      id: profile.id,
      email: profile.email,
      firstname: profile.firstname,
      lastname: profile.lastname,
      role: profile.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    console.log(token)

    // Step 4 Response
    res.json({
      message: "Login Success",
      payload: payload,
      token: token,
    });

  } catch (err) {
    next(err);
  }
};
```
file .env 
```bash
SECRET_KEY=cc19_wordhard
```

## Step 10 user-route


