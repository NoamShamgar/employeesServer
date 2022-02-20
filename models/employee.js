const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    email: {type:String, unique:true},
    password:String,
    ready:{type:Boolean,default:false} // does it have a password and username
});

const employeeModel = mongoose.model("employee",employeeSchema);

module.exports = employeeModel;