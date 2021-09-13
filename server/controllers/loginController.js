const jwt = require("jsonwebtoken");
const db = require("./databaseController.js");

const Users = db.collection("users");

const login = async (req, res) => {
    const user = await Users.findOne({
        username: req.body.username,
    });

    const body = {
        username: user.username,
        isAdmin: user.isAdmin,
    };
    const token = jwt.sign({ user: body }, process.env.SECRET_KEY);
    res.json({
        message: "Login successful!",
        token: token,
    });
};

module.exports = {
    login,
};
