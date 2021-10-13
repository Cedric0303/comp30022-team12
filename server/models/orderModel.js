const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    clientReference: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    userReference: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderTotal: { type: Number, required: true },
    updatedAt: { type: Date, required: true },
});

const OrderModel = mongoose.model("orderModel", orderSchema);

module.exports = OrderModel;
