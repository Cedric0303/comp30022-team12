const mongoose = require("mongoose");

const db = require("./databaseController.js");

const TagModel = require("../models/tagModel.js");
const { ClientModel, NoteModel } = require("../models/clientModel.js");

const Tags = db.collection("tags");
const Clients = db.collection("clients");
const RecycleBin = db.collection("recycle-bin");

const getClients = async (req, res) => {
    if (!req.body.uid) {
        const clients = await Clients.find({})
            .project({
                _id: false,
                password: false,
            })
            .toArray();
        res.json({
            clients: clients,
        });
    } else {
        const clients = await Clients.find({
            usernameReference: req,
        })
            .project({
                _id: false,
                password: false,
            })
            .toArray();
        res.json({
            clients: clients,
        });
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
        client: client,
    });
};

const addClientNote = async (req, res) => {
    const newNote = new NoteModel({
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

const changeTag = async (req, res) => {
    const changeTag = await Tags.findOne({
        id: req.body.tagID,
    });
    await Clients.findOneAndUpdate(
        {
            email: req.params.cid,
        },
        {
            $set: {
                tag: changeTag.name,
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
                message: "Change tag successful!",
                user: doc.value,
            });
        }
    );
};

const addClient = async (req, res) => {
    const defaultNewTag = await Tags.findOne({
        id: "new",
    });
    const newClient = new ClientModel({
        email: req.body.email,
        address: req.body.address,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        photoURL: req.body.photoURL,
        usernameReference: req.body.usernameReference,
        tag: defaultNewTag.name,
        notes: [],
    });
    await Clients.insertOne(newClient);
    const client = await Clients.findOne(
        {
            email: req.body.email,
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
    const tag = await Tags.findOne({
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
                usernameReference: req.body.usernameReference,
                tag: tag,
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
    await RecycleBin.insertOne(removeClient);
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
    addClient,
    editClient,
    removeClient,
};
