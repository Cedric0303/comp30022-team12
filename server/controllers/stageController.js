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
        {}
    );
    res.json({
        message: "Get stage successful!",
        stage: stage,
    });
};

const createStage = async (req, res) => {
    const maxPos = Stages.find().sort({ position: -1 }).limit(1);
    const stageID = req.body.sname.replace(/\s+/g, "_");
    const exist = await Stages.findOne(
        {
            id: stageID,
        },
        {}
    );
    if (exist) {
        res.json({
            message: "Stage already exist!",
            stage: exist,
        });
    } else {
        const maxPos = await Stages.find()
            .sort({ position: -1 })
            .limit(1)
            .toArray();
        const newStage = new StageModel({
            id: stageID,
            name: req.body.sname,
            position: parseInt(maxPos[0].position) + 1,
        });
        await Stages.insertOne(newStage);
        res.json({
            message: "Stage creation successful!",
            stage: newStage,
        });
    }
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
            },
        },
        {
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
    await reorderStages();
    res.json({
        message: "Stage removal successful!",
    });
};

const reorderStages = async () => {
    const allStage = await Stages.find({}).sort({ position: 1 }).toArray();
    for (let i = 0; i < allStage.length; i++) {
        await Stages.findOneAndUpdate(
            {
                id: allStage[i].id,
            },
            {
                $set: {
                    position: i,
                },
            }
        );
    }
};

module.exports = {
    getStages,
    getStage,
    createStage,
    editStage,
    editStages,
    removeStage,
};
