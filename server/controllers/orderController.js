const mongoose = require("mongoose");

const db = require("./databaseController.js");

const OrderModel = require("../models/orderModel.js");

const Orders = db.collection("orders");
const Clients = db.collection("clients");
const Users = db.collection("users");
const RecycleBin = db.collection("recycle-bin");

const getOrders = async (req, res) => {
    if (!req.body.userReference) {
        try {
            const orders = await Orders.find({}).toArray();
            res.json({
                message: "Get all orders successful!",
                orders: orders,
            });
        } catch {
            res.json({
                message: "No orders available!",
                orders: [],
            });
        }
    } else if (req.body.clientReference) {
        try {
            const orders = await Orders.find({
                userReference: req.body.userReference,
                clientReference: req.body.clientReference,
            }).toArray();
            res.json({
                message: "Get orders successful!",
                orders: orders,
            });
        } catch {
            res.json({
                message: "No orders available!",
                orders: [],
            });
        }
    } else {
        try {
            const orders = await Orders.find({
                userReference: req.body.userReference,
            }).toArray();
            res.json({
                message: "Get orders successful!",
                orders: orders,
            });
        } catch {
            res.json({
                message: "No orders available!",
                orders: [],
            });
        }
    }
};

const getOrder = async (req, res) => {
    const order = await Orders.findOne({
        _id: mongoose.Types.ObjectId(req.params.oid),
    });
    res.json({
        message: "Get order successful!",
        order: order,
    });
};

const createOrder = async (req, res) => {
    const client = await Clients.findOne({
        email: req.body.clientReference,
    });
    const user = await Users.findOne({
        username: req.body.userReference,
    });
    if (client && user) {
        const newOrder = new OrderModel({
            orderItem: [],
            clientReference: client.email,
            userReference: user.username,
            orderTotal: req.body.orderTotal,
            updatedAt: new Date(),
        });
        const result = await Orders.insertOne(newOrder);
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
        const order = await Orders.findOne({
            _id: result.insertedId,
        });
        res.json({
            message: "Order creation successful!",
            order: order,
        });
    } else {
        res.json({
            message: "Client/User doesn't exist!",
        });
    }
};

const editOrder = async (req, res) => {
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
        await Orders.findOneAndUpdate(
            {
                _id: mongoose.Types.ObjectId(req.params.oid),
            },
            {
                $set: {
                    clientReference: client.email,
                    userReference: user.username,
                    orderTotal: req.body.orderTotal,
                },
            }
        );
        const order = await Orders.findOne({
            _id: mongoose.Types.ObjectId(req.params.oid),
        });
        res.json({
            message: "Edit order successful!",
            order: order,
        });
    } else {
        res.json({
            message: "Client/User doesn't exist!",
        });
    }
};

const removeOrder = async (req, res) => {
    const removeOrder = await Orders.findOne({
        _id: mongoose.Types.ObjectId(req.params.oid),
    });
    await RecycleBin.insertOne({
        removeOrder: removeOrder,
        createdAt: new Date(),
    });
    await Orders.deleteOne({
        _id: mongoose.Types.ObjectId(req.params.oid),
    });
    res.json({
        message: "Order removal successful!",
    });
};

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    editOrder,
    removeOrder,
};
