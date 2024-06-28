const express = require("express");
const signup = require("../Controller/UserController/signup");
const signin = require("../Controller/UserController/signin");
const { user } = require("../Config/prisma");
const users = require("../Controller/UserController/users");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", users);


module.exports = router;
