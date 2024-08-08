const mongoose=require('mongoose');

const subSchema=mongoose.Schema({
    Title:String,
    FirstBillDate:Date,
    NextBillDate:Date,
    Client:String,
    Tax:String,
    SecondTax:String,
    Note:String,
    Label:String,
    Type:String,
    Repeat:String,
    Cycle:String,
    Amount:String

},{
    versionKey : false
  })

const SubscriptionModel=mongoose.model('Subscription',subSchema)

module.exports=SubscriptionModel;