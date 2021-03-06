require("dotenv").config();
const bcrypt = require("bcrypt");

const db = require("./databaseController.js");

const Users = db.collection("users");
const RecycleBin = db.collection("recycle-bin");

const getUsers = async (req, res) => {
    try {
        const users = await Users.find(
            {},
            {
                projection: {
                    password: false,
                },
            }
        ).toArray();
        res.json({
            message: "Get users successful!",
            users: users,
        });
    } catch {
        res.json({
            message: "No users available!",
            users: [],
        });
    }
};

const getUser = async (req, res) => {
    const user = await Users.findOne(
        {
            username: req.params.uid,
        },
        {}
    );
    res.json({
        message: "Get user successful!",
        user: user,
    });
};

const createUser = async (req, res) => {
    const exist = Object.keys(req.authInfo).length > 0;
    if (exist) {
        res.json({
            message: "User already exists!",
        });
    } else {
        const user = await Users.findOne({
            username: req.user.username,
        });
        res.json({
            message: "Create user successful!",
            user: user,
        });
    }
};

const editUser = async (req, res) => {
    // find the user
    const user = await Users.findOne(
        {
            username: req.params.uid,
        },
        {
            projection: {
                password: true,
                isAdmin: true,
            },
        }
    );

    let hash = user.password;

    // Replace with old hash if password field was empty
    if (req.body.password !== "") {
        hash = await bcrypt.hash(req.body.password, parseInt(process.env.SALT));
    }

    await Users.findOneAndUpdate(
        {
            username: req.params.uid,
        },
        {
            $set: {
                username: req.body.username,
                password: hash,
                isAdmin: user.isAdmin,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            },
        },
        {
            returnDocument: "after",
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
    createUser,
    editUser,
    removeUser,
};
