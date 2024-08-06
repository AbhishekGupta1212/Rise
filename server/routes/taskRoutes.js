const express = require("express");
const { createTask, getAllTasks, updateTask, deleteTask } = require("../controller/taskController");

taskRouter = express.Router();

taskRouter.post("/",createTask)
taskRouter.get("/",getAllTasks)
taskRouter.patch("/:id",updateTask)
taskRouter.delete("/:id",deleteTask)

module.exports = {taskRouter}