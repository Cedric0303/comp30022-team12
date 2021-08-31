const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    res.json({
        message: "Signup successful!",
        user: req.user,
    });
};

const login = async (req, res) => {
    const body = {
        username: req.body.username,
        isAdmin: req.body.isAdmin,
    };
    const token = jwt.sign({ user: body }, process.env.SECRET_KEY);
    res.json({
        message: "Login successful!",
        token: token,
    });
};

module.exports = {
    signup,
    login,
};
