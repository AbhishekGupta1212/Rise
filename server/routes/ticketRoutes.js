const express = require("express")
const { getAllTickets, createTicket, updateTicket, deleteTicket } = require("../controller/ticketController")

ticketRouter = express.Router();

ticketRouter.get("/",getAllTickets)
ticketRouter.post("/",createTicket)
ticketRouter.patch("/:id",updateTicket)
ticketRouter.delete("/:id",deleteTicket)

module.exports = {ticketRouter}