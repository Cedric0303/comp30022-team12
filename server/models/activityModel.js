const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    clientReference: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    userReference: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    timeStart: { type: Date, required: true },
    timeEnd: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

const ActivityModel = mongoose.model("activity", activitySchema);

module.exports = ActivityModel;
