const express = require("express");

const clientRouter = express.Router();

const clientController = require("../controllers/clientController.js");

clientRouter.get("/", clientController.getClients);

clientRouter.post("/", clientController.getClients);

clientRouter.get("/:cid", clientController.getClient);

clientRouter.post("/create", clientController.createClient);

clientRouter.post("/:cid/addNote", clientController.addClientNote);

clientRouter.post("/:cid/removeNote", clientController.removeClientNote);

clientRouter.post("/:cid/changeStage", clientController.changeClientStage);

clientRouter.post("/:cid/edit", clientController.editClient);

clientRouter.get("/:cid/remove", clientController.removeClient);

module.exports = clientRouter;
