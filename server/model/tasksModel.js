const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    milestone: {
        type: String,
        required: true
    },
    relatedTo: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    collaborators: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["todo", "review", "in progress"]
    }
},{
    versionKey : false
});

const TaskModule = mongoose.model("tasks",taskSchema)

module.exports = {TaskModule}