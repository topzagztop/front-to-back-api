const createError = require("../utils/createError");
const prisma = require("../configs/prisma")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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

exports.currentUser = async (req, res, next) => {
  // code
  try {
    res.json({ message: "Hello, current user" });
  } catch (error) {
    next(error);
  }
};
