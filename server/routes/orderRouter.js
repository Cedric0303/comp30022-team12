const express = require("express");

const orderRouter = express.Router();

const orderController = require("../controllers/orderController.js");

orderRouter.get("/", orderController.getOrders);

orderRouter.post("/", orderController.getOrders);

orderRouter.get("/:oid", orderController.getOrder);

orderRouter.post("/create", orderController.createOrder);

orderRouter.post("/:oid/edit", orderController.editOrder);

orderRouter.get("/:oid/remove", orderController.removeOrder);

module.exports = orderRouter;
