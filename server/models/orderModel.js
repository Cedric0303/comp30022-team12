const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    clientReference: { type: String, required: true },
    userReference: { type: String, required: true },
    orderTotal: { type: Number, required: true },
    updatedAt: { type: Date, required: true },
});

const OrderModel = mongoose.model("orderModel", orderSchema);

module.exports = OrderModel;
