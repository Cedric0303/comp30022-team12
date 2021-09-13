const express = require("express");
const passport = require("passport");

const loginRouter = express.Router();

const loginController = require("../controllers/loginController.js");

loginRouter.post(
    "/login",
    passport.authenticate("login", { session: false }),
    loginController.login
);

module.exports = loginRouter;
