const express = require("express");

const stageRouter = express.Router();

const stageController = require("../controllers/stageController.js");

stageRouter.get("/", stageController.getStages);

stageRouter.get("/:sid", stageController.getStage);

stageRouter.post("/create", stageController.createStage);

stageRouter.post("/:sid/edit", stageController.editStage);

stageRouter.get("/:sid/remove", stageController.removeStage);

module.exports = stageRouter;
