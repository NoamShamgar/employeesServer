const Employee = require("../models/employee");

const getAllEmployeesCredentials_DAL = async () => {
    return await Employee.find({});
}

const getEmployeeCredentialsById_DAL = async (id) => {
    return await Employee.findById(id);
}

const getEmployeeCredentialsByEmail_DAL = async (email) => {
    return await Employee.find({email:email});
}

const checkIfEmailExist_DAL = async (email) => {
    return await Employee.exists({email:email});
}

const addEmployeeCredentials_DAL = async (obj) => {
    let newEmployee = new Employee(obj);
    return await newEmployee.save();
}

const updateEmployeeCredentials_DAL = async (id,obj) => {
    return await Employee.findByIdAndUpdate(id,obj);
}

const deleteEmployeeCredentials_DAL = async (id) => {
    return await Employee.findByIdAndDelete(id);
}

module.exports = {  
                    getAllEmployeesCredentials_DAL,
                    getEmployeeCredentialsById_DAL,
                    getEmployeeCredentialsByEmail_DAL,
                    checkIfEmailExist_DAL,
                    addEmployeeCredentials_DAL,
                    updateEmployeeCredentials_DAL,
                    deleteEmployeeCredentials_DAL
                 }