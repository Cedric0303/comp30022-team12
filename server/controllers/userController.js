require("dotenv").config();
// const bcrypt = require("bcrypt");

const db = require("./databaseController.js");

// const userModel = require("../models/userModel.js");

const User = db.collection("user");

const getUsers = async (req, res) => {
    const users = await User.find()
        .project({
            _id: false,
            password: false,
        })
        .toArray();
    res.json({
        users: users,
    });
};

module.exports = {
    getUsers,
};
