require("dotenv").config();

const db = require("./databaseController.js");

const TagModel = require("../models/tagModel.js");

const Tags = db.collection("tags");
const RecycleBin = db.collection("recycle-bin");

const getTags = async (req, res) => {
    const tags = await Tags.find()
        .project({
            _id: false,
        })
        .toArray();
    res.json({
        message: "Get tags successful!",
        tags: tags,
    });
};

const getTag = async (req, res) => {
    const tag = await Tags.findOne({
        name: req.params.tid,
    });
    res.json({
        message: "Get tag successful!",
        tag: tag,
    });
};

const createTag = async (req, res) => {
    const tagID = req.body.tname.replace(/\s+/g, "_");
    const newTag = new TagModel({
        id: tagID,
        name: req.body.tname,
    });
    await Tags.insertOne(newTag);
    res.json({
        message: "Tag creation successful!",
        tag: newTag,
    });
};

const editTag = async (req, res) => {
    const tagID = req.body.tname.replace(/\s+/g, "_");
    await Tags.findOneAndUpdate(
        {
            id: req.params.tid,
        },
        {
            $set: {
                id: tagID,
                name: req.body.tname,
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
                message: "Edit tag successful!",
                tag: doc.value,
            });
        }
    );
};

const removeTag = async (req, res) => {
    const removeTag = await Tags.findOne({
        name: req.params.tid,
    });
    await RecycleBin.insertOne(removeTag);
    await Tags.deleteOne({
        name: req.params.tid,
    });
    res.json({
        message: "Tag removal successful!",
    });
};

module.exports = {
    getTags,
    getTag,
    createTag,
    editTag,
    removeTag,
};
