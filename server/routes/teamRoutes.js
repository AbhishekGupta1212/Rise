const express = require("express");
const { getAllTeam, addTeam, getTeam, deleteTeam, addTime, getAttendance } = require("../controller/teamContoller");

teamRouter = express.Router();

teamRouter.get("/",getAllTeam)
teamRouter.post("/",addTeam)
teamRouter.get("/:id",getTeam)
teamRouter.delete("/:id",deleteTeam)
teamRouter.post("/addTime",addTime)
teamRouter.get("/attendance",getAttendance)

module.exports = {teamRouter}