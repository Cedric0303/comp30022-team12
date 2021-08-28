const express = require("express");

const clientRouter = express.Router();

const clientController = require("../controllers/clientController.js");

clientRouter.get("/", clientController.getClients);

clientRouter.get("/:cid", clientController.getClient);

clientRouter.post("/create", clientController.addClient);

clientRouter.post("/:cid/addNote", clientController.addClientNote);

clientRouter.post("/:cid/removeNote", clientController.removeClientNote);

clientRouter.post("/:cid/changeTag", clientController.changeTag);

clientRouter.post("/:cid/edit", clientController.editClient);

clientRouter.post("/:cid/remove", clientController.removeClient);

module.exports = clientRouter;
