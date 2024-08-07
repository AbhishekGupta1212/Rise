const express = require("express");
const { getAllProjects, createProject, updateProject, deleteProject } = require("../controller/projectController");

projectRouter = express.Router();

projectRouter.get("/",getAllProjects)
projectRouter.post("/",createProject)
projectRouter.patch("/:id",updateProject)
projectRouter.delete("/:id",deleteProject)

module.exports = {projectRouter}