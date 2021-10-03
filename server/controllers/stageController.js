require("dotenv").config();

const db = require("./databaseController.js");

const StageModel = require("../models/stageModel.js");

const Stages = db.collection("stages");
const RecycleBin = db.collection("recycle-bin");

const getStages = async (req, res) => {
    try {
        const stages = await Stages.find({}).toArray();
        res.json({
            message: "Get stages successful!",
            stages: stages,
        });
    } catch {
        res.json({
            message: "No stages available!",
            stages: [],
        });
    }
};

const getStage = async (req, res) => {
    const stage = await Stages.findOne(
        {
            name: req.params.sid,
        },
        {
            projection: {
                _id: false,
            },
        }
    );
    res.json({
        message: "Get stage successful!",
        stage: stage,
    });
};

const createStage = async (req, res) => {
    const stageID = req.body.sname.replace(/\s+/g, "_");
    const newStage = new StageModel({
        id: stageID,
        name: req.body.sname,
        position: req.body.position,
    });
    await Stages.insertOne(newStage);
    const stage = await Stages.findOne(
        {
            id: stageID,
        },
        {
            projection: {
                _id: false,
            },
        }
    );
    res.json({
        message: "Stage creation successful!",
        stage: stage,
    });
};

const editStage = async (req, res) => {
    const stageID = req.body.sname.replace(/\s+/g, "_");
    await Stages.findOneAndUpdate(
        {
            id: req.params.sid,
        },
        {
            $set: {
                id: stageID,
                name: req.body.sname,
                position: req.body.position,
            },
        },
        {
            projection: {
                _id: false,
            },
            returnDocument: "after",
        },
        (err, doc) => {
            if (err) {
                res.json({
                    message: err,
                });
            }
            res.json({
                message: "Edit stage successful!",
                stage: doc.value,
            });
        }
    );
};

const editStages = async (req, res) => {
    const changeStages = req.body.stageArray;
    for (var i in changeStages) {
        var oldSID = changeStages[i].oldSID;
        var newStageName = changeStages[i].newStageName;
        var newSID = newStageName.replace(/\s+/g, "_");
        var newPosition = changeStages[i].newPosition;
        await Stages.findOneAndUpdate(
            {
                id: oldSID,
            },
            {
                $set: {
                    id: newSID,
                    name: newStageName,
                    position: newPosition,
                },
            }
        );
    }
    res.json({
        message: "Edit stages successful!",
    });
};

const removeStage = async (req, res) => {
    const removeStage = await Stages.findOne({
        id: req.params.sid,
    });
    await RecycleBin.insertOne({
        removeStage: removeStage,
        createdAt: new Date(),
    });
    await Stages.deleteOne({
        id: req.params.sid,
    });
    res.json({
        message: "Stage removal successful!",
    });
};

module.exports = {
    getStages,
    getStage,
    createStage,
    editStage,
    editStages,
    removeStage,
};
