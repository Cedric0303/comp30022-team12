const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    clientReference: { type: String, required: true },
    userReference: { type: String, required: true },
    type: { type: String, required: true },
    timeStart: { type: Date, required: true },
    timeEnd: { type: Date, required: true },
});

const ActivityModel = mongoose.model("activity", activitySchema);

module.exports = ActivityModel;
