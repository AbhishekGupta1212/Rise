const mongoose=require('mongoose');

const teamSchema=mongoose.Schema({
FirstName:String,
LastName:String,
Email:String,
Phone:String,
Gender:String,
JobTitle:String,
Salary:String,
SalaryTerm:String,
DateOfHire:Date,
Password:String,
Role:String,
},{
    versionKey : false
  })

const teamModel=mongoose.model('Team',teamSchema);

module.exports=teamModel;