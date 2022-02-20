const {getAllEmployeesDetails} = require("../DAL/detailsJSON")
const {getAllEmployeesPermissions} = require("../DAL/permissionsJSON")
const {getEmployeeCredentialsById_DAL} = require("../DAL/credentialsDB")

// getting an employee id and returning his max session time
const getEmployeeSessTime = (id) => {
        return new Promise(async (resolve,reject) => {
            try {
                let allDetails = await getAllEmployeesDetails()
                let thisEmployeeDetails = allDetails.find(employeeDetails => employeeDetails.employeeId == id);
                resolve(thisEmployeeDetails.sessTimeout);
            } catch (err) {
                reject(err)
            }
        });
}

// getting an employee id and returning his permissions
const getEmployeePermissions =  (id) => {
    return new Promise(async(resolve,reject) => {
        try {
            let allPermissions = await getAllEmployeesPermissions();
            let thisEmployeePermissions = allPermissions.find(employee => employee.employeeId == id);
            resolve(thisEmployeePermissions.permissions);
        } catch (err) {
             reject(err)
         }
    })
}


// this function being called from the router, if rejecting the router will catch the error
const checkIfIdExist = async (id) => {
    return new Promise(async(resolve,reject) => {
        try {
            let exist = await getEmployeeCredentialsById_DAL(id); // if this will fail, the catch block will reject
            if (!exist){ // if exist is empty, it will reject
                reject("wrong employeeId")
                return
            }
            resolve(true)
        } catch (err) {
            reject("wrong employeeId")
        }
    });
}


module.exports = {getEmployeeSessTime,getEmployeePermissions,checkIfIdExist}