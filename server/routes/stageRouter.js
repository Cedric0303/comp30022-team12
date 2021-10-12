const express = require("express");

const stageRouter = express.Router();

const stageController = require("../controllers/stageController.js");

stageRouter.get("/", stageController.getStages);

stageRouter.get("/manageStages", stageController.getManageStages);

stageRouter.get("/:sid", stageController.getStage);

stageRouter.post("/create", stageController.createStage);

stageRouter.post("/:sid/edit", stageController.editStage);

stageRouter.post("/editStages", stageController.editStages);

stageRouter.get("/:sid/remove", stageController.removeStage);

module.exports = stageRouter;
