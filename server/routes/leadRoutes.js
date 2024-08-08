const express = require("express");
const { createLead, getAllLeads, updateLead, getLead, deleteLead } = require("../controller/leadController");

leadRouter = express.Router();

leadRouter.post("/",createLead)
leadRouter.get("/",getAllLeads)
leadRouter.get("/:id",getLead)
// leadRouter.get("/search",searchLead)
leadRouter.patch("/:id",updateLead)
leadRouter.delete("/:id",deleteLead)

module.exports = {leadRouter}