const express = require("express");

const userRouter = express.Router();

const userController = require("../controllers/userController.js");

userRouter.get("/", userController.getUsers);

userRouter.get("/:uid", userController.getUser);

userRouter.post("/:uid/edit", userController.editUser);

userRouter.get("/:uid/remove", userController.removeUser);

module.exports = userRouter;
