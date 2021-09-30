const mongoose = require("mongoose");

const db = require("./databaseController.js");

const { ClientModel, NoteModel } = require("../models/clientModel.js");

const Stages = db.collection("stages");
const Clients = db.collection("clients");
const RecycleBin = db.collection("recycle-bin");

const getClients = async (req, res) => {
    if (!req.body.userReference) {
        const clients = await Clients.find(
            {},
            {
                projection: {
                    _id: false,
                },
            }
        ).toArray();
        res.json({
            message: "Get all clients successful!",
            clients: clients,
        });
    } else {
        try {
            const clients = await Clients.find(
                {
                    userReference: req.body.userReference,
                },
                {
                    projection: {
                        _id: false,
                    },
                }
            ).toArray();
            res.json({
                message: "Get clients successful!",
                clients: clients,
            });
        } catch {
            res.json({
                message: "No clients available!",
                clients: [],
            });
        }
    }
};

const getClient = async (req, res) => {
    const client = await Clients.findOne(
        {
            email: req.params.cid,
        },
        {
            projection: {
                _id: false,
            },
        }
    );
    res.json({
        message: "Get client successful!",
        client: client,
    });
};

const addClientNote = async (req, res) => {
    const newNote = new NoteModel({
        _id: new mongoose.Types.ObjectId(),
        body: req.body.note,
    });
    await Clients.findOneAndUpdate(
        {
            email: req.params.cid,
        },
        {
            $push: { notes: newNote },
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
                message: "Add note successful!",
                user: doc.value,
                nid: newNote._id,
            });
        }
    );
};

const removeClientNote = async (req, res) => {
    await Clients.findOneAndUpdate(
        {
            email: req.params.cid,
        },
        {
            $pull: {
                notes: {
                    _id: mongoose.Types.ObjectId(req.body.nid),
                },
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
                message: "Remove note successful!",
                user: doc.value,
            });
        }
    );
};

const changeClientStage = async (req, res) => {
    const changeStage = await Stages.findOne({
        id: req.body.stageID,
    });
    await Clients.findOneAndUpdate(
        {
            email: req.params.cid,
        },
        {
            $set: {
                stage: changeStage.name,
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
                message: "Change stage successful!",
                user: doc.value,
            });
        }
    );
};

const createClient = async (req, res) => {
    const defaultNewStage = await Stages.findOne({
        id: "new",
    });
    const newClient = new ClientModel({
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        photoURL: req.body.photoURL,
        userReference: req.body.userReference,
        stage: defaultNewStage.name,
        notes: [],
    });
    const result = await Clients.insertOne(newClient);
    const client = await Clients.findOne(
        {
            _id: mongoose.Types.ObjectId(result.insertedId),
        },
        {
            projection: {
                _id: false,
            },
        }
    );
    res.json({
        message: "Client creation successful!",
        client: client,
    });
};

const editClient = async (req, res) => {
    const stage = await Stages.findOne({
        id: req.body.tagID,
    });
    await Clients.findOneAndUpdate(
        {
            email: req.params.cid,
        },
        {
            $set: {
                email: req.body.email,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                photoURL: req.body.photoURL,
                userReference: req.body.userReference,
                stage: stage,
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
                message: "Edit client successful!",
                user: doc.value,
            });
        }
    );
};

const removeClient = async (req, res) => {
    const removeClient = await Clients.findOne({
        email: req.params.cid,
    });
    await RecycleBin.insertOne({
        removeClient,
        createdAt: new Date(),
    });
    await Clients.deleteOne({
        email: req.params.cid,
    });
    res.json({
        message: "Client removal successful!",
    });
};

module.exports = {
    getClients,
    getClient,
    addClientNote,
    removeClientNote,
    changeClientStage,
    createClient,
    editClient,
    removeClient,
};
