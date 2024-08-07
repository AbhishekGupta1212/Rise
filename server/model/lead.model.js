const mongoose = require("mongoose");

const leadSchema = mongoose.Schema(
    {
      name: String,
      Owner:String,
      CompanyName: String,
      Status:String,
      Source:String,
      Address:String,
      City:String,
      Country:String,
      Phone:String,
      Website: String,
      VATNumber:Number,
      GSTNumber:Number,
      Currency:Number,
      CurrencySymbol:String,
      Labels:String,
      PrimaryContact:String,
    CurrentDate:Date
  }
);

const leadModel= mongoose.model("Lead", leadSchema);

module.exports = leadModel;