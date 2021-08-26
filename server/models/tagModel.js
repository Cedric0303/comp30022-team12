const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TagSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
});

const TagModel = mongoose.model("tag", TagSchema);

module.exports = TagModel;
