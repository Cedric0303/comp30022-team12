require('dotenv').config()
const path = require('path');
const express = require("express");
const passport = require('passport')


const loginRouter = require('./routes/loginRouter.js')
const userRouter = require('./routes/userRouter.js')

require("./auth/auth")

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.use("/api/account", loginRouter);
app.use("/api/users", passport.authenticate('jwt', { session: false }), userRouter);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});