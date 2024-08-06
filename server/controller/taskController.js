const {TaskModule} = require("../model/tasksModel")

const getAllTasks = async(req,res)=>{
    try {
        const{userId , ...filters} = req.query;
       
        const tasks = await TaskModule.find({ userId, ...filters });
        res.send({tasks})
    } catch (error) {
        res.status(401).send({ error: "Error in fetching data!" });
    }
}

//create
const createTask = async(req,res)=>{
    try {
        const task = new TaskModule(req.body)
        await task.save();
        res.status(201).send({msg: "Task Added Successfully"});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

// update

const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await TaskModule.findByIdAndUpdate(id, req.body, { new: true });
        if (!task) return res.status(404).send({ error: 'Task not found' });
        res.send(task);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

//delete

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await TaskModule.findByIdAndDelete(id);
        if (!task) return res.status(404).send({ error: 'Task not found' });
        res.send({ msg: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}


module.exports = {
    createTask, getAllTasks , updateTask, deleteTask
}