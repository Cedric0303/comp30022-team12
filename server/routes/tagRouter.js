const express = require("express");

const tagRouter = express.Router();

const tagController = require("../controllers/tagController.js");

tagRouter.get("/", tagController.getTags);

tagRouter.get("/:tid", tagController.getTag);

tagRouter.post("/create", tagController.createTag);

tagRouter.post("/:tid/edit", tagController.editTag);

tagRouter.get("/:tid/remove", tagController.removeTag);

module.exports = tagRouter;
