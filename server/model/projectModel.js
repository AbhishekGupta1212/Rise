const {  mongoose } = require("mongoose");

const projectSchema = mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique : true
    },
    title:{
        type: String, required: true
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'clients',
        require: true
    },
    price:{
        type: String,
        default : "-"
    },
    startDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    deadline:{
        type: Date,
        required:true
    },
    status:{
        type: String,
        enum: ["Open","Closed"],
        default: "Open"
    }

},{
    versionKey : false
})

const Project = mongoose.model("Project",projectSchema)

module.exports ={Project}