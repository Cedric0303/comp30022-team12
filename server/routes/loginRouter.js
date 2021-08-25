const express = require("express");
const passport = require("passport");

const loginRouter = express.Router();

const loginController = require("../controllers/loginController.js");

loginRouter.post(
    "/signup",
    passport.authenticate("signup", { session: false }),
    loginController.signup
);

loginRouter.post(
    "/login",
    passport.authenticate("login", { session: false }),
    loginController.login
);

module.exports = loginRouter;
