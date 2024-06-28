const jwt = require("jsonwebtoken");
const prisma = require("../../Config/prisma");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { fullname, email, password, type } = req.body;
    console.log(req.body);
    const checkEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (checkEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        fullname: fullname,
        email: email,
        password: hashedPassword,
        userType: type,
      },
    });

    const accessToken = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created successfully",
      accessToken: accessToken,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = signup;
