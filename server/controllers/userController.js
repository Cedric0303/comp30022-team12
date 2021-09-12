require("dotenv").config();
const bcrypt = require("bcrypt");

const db = require("./databaseController.js");

const Users = db.collection("users");
const RecycleBin = db.collection("recycle-bin");

const getUsers = async (req, res) => {
    const users = await Users.find(
        {},
        {
            projection: {
                _id: true,
                password: false,
            },
        }
    ).toArray();
    res.json({
        message: "Get users successful!",
        users: users,
    });
};

const getUser = async (req, res) => {
    const user = await Users.findOne(
        {
            username: req.params.uid,
        },
        {
            projection: {
                _id: false,
            },
        }
    );
    res.json({
        message: "Get user successful!",
        user: user,
    });
};

const editUser = async (req, res) => {
    const hash = await bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT)
    );
    await Users.findOneAndUpdate(
        {
            username: req.params.uid,
        },
        {
            $set: {
                username: req.body.username,
                password: hash,
                isAdmin: req.body.isAdmin,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            },
        },
        {
            projection: {
                _id: false,
            },
            returnNewDocument: true,
        },
        (err, doc) => {
            if (err) {
                res.json({
                    message: err,
                });
            }
            res.json({
                message: "Edit user successful!",
                user: doc.value,
            });
        }
    );
};

const removeUser = async (req, res) => {
    const removeUser = await Users.findOne({
        username: req.params.uid,
    });
    await RecycleBin.insertOne({
        removeUser,
        createdAt: new Date(),
    });
    await Users.deleteOne({
        username: req.params.uid,
    });
    res.json({
        message: "User removal successful!",
    });
};

module.exports = {
    getUsers,
    getUser,
    editUser,
    removeUser,
};
