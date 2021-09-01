const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecycleBinSchema = new Schema({});

const RecycleBinModel = mongoose.model("recyclebin", RecycleBinSchema);

module.exports = RecycleBinModel;
