const express = require("express");
const passport = require("passport");

const userRouter = express.Router();

const userController = require("../controllers/userController.js");

userRouter.get("/", userController.getUsers);

userRouter.get("/:uid", userController.getUser);

userRouter.post(
    "/create",
    passport.authenticate("signup", { session: false }),
    userController.createUser
);

userRouter.post("/:uid/edit", userController.editUser);

userRouter.get("/:uid/remove", userController.removeUser);

module.exports = userRouter;
