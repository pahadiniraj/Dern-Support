const jwt = require("jsonwebtoken");
const prisma = require("../../Config/prisma");
const bcrypt = require("bcrypt");

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password don't match" });
    }
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({

      
      message: "User logged in successfully",
      accessToken: accessToken,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = signin;
