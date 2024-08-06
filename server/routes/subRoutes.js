const express = require("express");
const { getAllSub, addSub, getSub, searchSub } = require("../controller/subController");

subRouter = express.Router();

subRouter.get("/",getAllSub)
subRouter.post("/",addSub)
subRouter.get("/:id",getSub)
subRouter.get("/search",searchSub)

module.exports = {subRouter}