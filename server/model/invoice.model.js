const mongoose = require("mongoose");

const InvoiceSchema=mongoose.Schema({
BillDate:Date,
DueDate:Date,
Client:String,
Project:String,
Tax:String,
SecondTax:String,
TDS:String,
Note:String,
Label:String,
InvoiceId:String,
TotalInvoiced:String,
PaymentRecieved:String,
PaymentDue:String
},{
    versionKey : false
  })

const Invoice=mongoose.model("Invoices",InvoiceSchema);

module.exports=Invoice;