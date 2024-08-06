const mongoose = require("mongoose")

const clientSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    primaryContact: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    projects: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    received: {
        type: String,
        required: true
    },
    due: {
        type: String,
        required: true
    },
    clientGroup: {
        type: String,
        required: true,
        enum: ["VIP", "Gold", "Silver"]
    },
    label: {
        type: String,
        required: true,
        enum: ["corporate", "Unsatisfied","Referral","potential", "inactive"]
    }
},{
    versionKey : false
});

const ClientModule = mongoose.model("clients",clientSchema)

module.exports = {ClientModule}