const mongoose=require('mongoose');

const timeCardSchema=mongoose.Schema({
    TeamMember:String,
    StartTime:String,
    EndTime:String,
    InDate:Date,
    OutDate:Date,
    Note:String
})

const timeCardModel=mongoose.model('Time Card',timeCardSchema);

module.exports=timeCardModel;