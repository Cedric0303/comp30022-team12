const express = require("express");
// const passport = require("passport");

const userRouter = express.Router();

const userController = require("../controllers/userController.js");

userRouter.get("/", userController.getUsers);

module.exports = userRouter;
