const mongoose=require('mongoose')

const ItemSchema=mongoose.Schema({
    Title:String,
    Description:String,
    Category:String,
    Rate:Number,
    UnitType:String
},{
    versionKey : false
  })

const ItemModel=mongoose.model('Items', ItemSchema)

module.exports=ItemModel