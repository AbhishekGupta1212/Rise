const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    ticketID: {
        type:Number,
        required: true,
        unique: true
    },
    title:{
        type:String, required:true
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'clients',
        require: true
    },
    ticketType: {
        type: String,
        required: true,
        enum: ["Bug Reports", "General Support", "Sales Enquiry"]
    },
    assignedTo: {
        type: String,
        enum: ["John Doe", "Mark Thomas", "Michael Wood", "Sara Ann", "Richard Gray"],
        default: "Michael Wood"
    },
    lastActivity: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ["Open", "New", "Client Replied", "Closed"],
        default: "New"
    },

},{
    versionKey : false
})

const Ticket = mongoose.model('Ticket',ticketSchema)

module.exports = {Ticket}