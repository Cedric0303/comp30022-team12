const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StageSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    position: { type: Number, required: true },
});

const StageModel = mongoose.model("stage", StageSchema);

module.exports = StageModel;
