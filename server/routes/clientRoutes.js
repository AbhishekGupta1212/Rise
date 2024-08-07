const express = require("express");
const { createClient, getAllClients, updateClient, deleteClient } = require("../controller/clientController");

clientRouter = express.Router();

clientRouter.post("/",createClient)
clientRouter.get("/",getAllClients)
clientRouter.patch("/:id",updateClient)
clientRouter.delete("/:id",deleteClient)

module.exports = {clientRouter}