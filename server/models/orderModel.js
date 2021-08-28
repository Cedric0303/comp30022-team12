const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    itemName: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const orderSchema = new Schema({
    orderItem: [],
    clientReference: { type: String, required: true },
    userReference: { type: String, required: true },
    orderTotal: { type: Number, required: true },
});

const OrderItemModel = mongoose.model("orderItem", orderItemSchema);
const OrderModel = mongoose.model("orderModel", orderSchema);

module.exports = {
    OrderItemModel,
    OrderModel,
};
