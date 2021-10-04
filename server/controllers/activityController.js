const mongoose = require("mongoose");

const db = require("./databaseController.js");

const ActivityModel = require("../models/activityModel.js");

const Activities = db.collection("activities");
const Clients = db.collection("clients");
const Users = db.collection("users");
const RecycleBin = db.collection("recycle-bin");

const getActivities = async (req, res) => {
    if (!req.body.userReference) {
        const activities = await Activities.find({}).toArray();
        res.json({
            message: "Get all activities successful!",
            activities: activities,
        });
    } else if (!req.body.clientReference) {
        try {
            const activities = await Activities.find({
                userReference: req.body.userReference,
            }).toArray();
            res.json({
                message: "Get activities successful!",
                activities: activities,
            });
        } catch {
            res.json({
                message: "No activities available!",
                activities: [],
            });
        }
    } else {
        try {
            const activities = await Activities.find({
                userReference: req.body.userReference,
                clientReference: req.body.clientReference,
            }).toArray();
            res.json({
                message: "Get activities successful!",
                activities: activities,
            });
        } catch {
            res.json({
                message: "No activities available!",
                activities: [],
            });
        }
    }
};

const getActivity = async (req, res) => {
    const activity = await Activities.findOne({
        _id: mongoose.Types.ObjectId(req.params.aid),
    });
    res.json({
        message: "Get activity successful!",
        activity: activity,
    });
};

const createActivity = async (req, res) => {
    const client = await Clients.findOne({
        email: req.body.clientReference,
    });
    const user = await Users.findOne({
        username: req.body.userReference,
    });
    if (client && user) {
        const newActivity = new ActivityModel({
            clientReference: client.email,
            userReference: user.username,
            type: req.body.type,
            timeStart: new Date(req.body.timeStart),
            timeEnd: new Date(req.body.timeEnd),
        });
        const result = await Activities.insertOne(newActivity);
        const activity = await Activities.findOne({
            _id: mongoose.Types.ObjectId(result.insertedId),
        });
        // update last interaction time with client
        await Clients.findOneAndUpdate(
            {
                email: req.body.clientReference,
            },
            {
                $set: {
                    updatedAt: new Date(),
                },
            }
        );
        res.json({
            message: "Activity creation successful!",
            activity: activity,
        });
    } else {
        res.json({
            message: "Client/User doesn't exist!",
        });
    }
};

const editActivity = async (req, res) => {
    const client = await Clients.findOne({
        email: req.body.clientReference,
    });
    const user = await Users.findOne({
        username: req.body.userReference,
    });
    if (client && user) {
        await Clients.findOneAndUpdate(
            {
                email: req.body.clientReference,
            },
            {
                $set: {
                    updatedAt: new Date(),
                },
            }
        );
        await Activities.findOneAndUpdate(
            {
                _id: mongoose.Types.ObjectId(req.params.aid),
            },
            {
                $set: {
                    clientReference: client.email,
                    userReference: user.username,
                    type: req.body.type,
                    timeStart: new Date(req.body.timeStart),
                    timeEnd: new Date(req.body.timeEnd),
                },
            },
            {
                returnNewDocument: true,
            },
            (err, doc) => {
                if (err) {
                    res.json({
                        message: err,
                    });
                }
                res.json({
                    message: "Edit activity successful!",
                    activity: doc.value,
                });
            }
        );
    } else {
        res.json({
            message: "Client/User doesn't exist!",
        });
    }
};

const removeActivity = async (req, res) => {
    const removeActivity = await Activities.findOne({
        _id: mongoose.Types.ObjectId(req.params.aid),
    });
    await RecycleBin.insertOne({
        removeActivity,
        createdAt: new Date(),
    });
    await Activities.deleteOne({
        _id: mongoose.Types.ObjectId(req.params.aid),
    });
    res.json({
        message: "Activity removal successful!",
    });
};

module.exports = {
    getActivities,
    getActivity,
    createActivity,
    editActivity,
    removeActivity,
};
