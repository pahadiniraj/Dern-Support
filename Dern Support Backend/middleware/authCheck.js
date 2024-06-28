const jwt = require("jsonwebtoken");
const prisma = require("../Config/prisma");

const authcheck = async (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    token = token.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userFromDb = await prisma.user.findUnique({
      where: {
        id: parseInt(decodedToken.id),
      },
    });

    if (!userFromDb) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = userFromDb;
    next();
  } catch (error) {
    console.log(error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token not valid" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = authcheck;
