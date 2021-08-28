const express = require("express");

const activityRouter = express.Router();

const activityController = require("../controllers/activityController.js");

activityRouter.get("/", activityController.getActivities);

activityRouter.post("/", activityController.getActivities);

activityRouter.get("/:aid", activityController.getActivity);

activityRouter.post("/create", activityController.createActivity);

activityRouter.post("/:aid/edit", activityController.editActivity);

activityRouter.get("/:aid/remove", activityController.removeActivity);

module.exports = activityRouter;
