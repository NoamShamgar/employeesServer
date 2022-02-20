const {getAllEmployeesCredentials_DAL,getEmployeeCredentialsById_DAL,getEmployeeCredentialsByEmail_DAL,checkIfEmailExist_DAL,addEmployeeCredentials_DAL,updateEmployeeCredentials_DAL,deleteEmployeeCredentials_DAL} = require("../DAL/credentialsDB");
const {getAllEmployeesDetails,postToAllEmployeesDetails} = require("../DAL/detailsJSON")
const {getAllEmployeesPermissions,postToAllEmployeesPermissions} = require("../DAL/permissionsJSON")
const lookForAuthorization = require("../auth/authorization")
const bcrypt = require("bcrypt");

// taking details and permissions from JSONS, merging them and returning
const getAllEmployees = (permissions) => {
    return new Promise(async (resolve,reject) => {
        if(!lookForAuthorization(permissions)) {  // authorization
            reject("access denied")
        } else {
            try {
                // getting required data
                let creds = await getAllEmployeesCredentials_DAL();
                let details = await getAllEmployeesDetails();
                let permissions = await getAllEmployeesPermissions();

                // shaping data to one array
                let mergedArr = []; // arr to be returned
                creds.forEach(employeeCreds => { // nested for loops to find matching data to merge
                    let thisEmployeeDetails = details.find(employeeDetail => employeeCreds._id == employeeDetail.employeeId)
                    let thisEmployeePermissions = permissions.find(employeePermissions => employeeCreds._id == employeePermissions.employeeId)
                    mergedArr.push(mergeEmployeeData(employeeCreds,thisEmployeeDetails,thisEmployeePermissions))
                });

                resolve(mergedArr);
            } catch (err) {
                reject(err)
            }
        }
    });
}

// taking details and permissions from JSONS, merging them and returning
const getEmployeeById = (permissions,id) => {
    return new Promise(async (resolve,reject) => {
        if(!lookForAuthorization(permissions)) { // authorization
            reject("access denied")
        } else {
            try {
                let employeeCreds = await getEmployeeCredentialsById_DAL(id);
                if(!employeeCreds) {
                    reject("invalid id")    
                    return
                }
                
                resolve(completeEmployeeData(employeeCreds))
            } catch (err) {
                reject(err)
            }
        }
    });
}

const getEmployeeByEmail = (email) => { // no authorization needed, calling this function only from the login route, and only if the email and passwords were correct
    return new Promise(async (resolve,reject) => {
            try {
                let employeeCreds = await getEmployeeCredsByEmail(email);
                if(!employeeCreds) {
                    reject("invalid email");
                    return
                }

                resolve(completeEmployeeData(employeeCreds,true))
            } catch (err) {
                reject(err)
            }
    });
}




const addEmployeeADMIN = (permissions,obj) => { // adding an employee to the system, without setting a password
    return new Promise(async (resolve,reject) => {   
        if(!lookForAuthorization(permissions)) { // authorization
            reject("access denied")
        } else {
            try {
                if(await checkIfEmailExist(obj.email)){            
                    reject("email exist")
                }
                
                let {_id:thisEmployeeId} = await addEmployeeCredentials_DAL({email:obj.email,password:""});
                
                let details = await getAllEmployeesDetails();
                details.push({
                    employeeId:thisEmployeeId,
                    fname:obj.fname,
                    lname:obj.lname,
                    created:new Date(),
                    sessTimeout:obj.sessTimeout
                });
                
                let permissions = await getAllEmployeesPermissions();
                permissions.push({
                    employeeId:thisEmployeeId,
                    permissions: obj.permissions
                });
                await postToAllEmployeesDetails(details);
                await postToAllEmployeesPermissions(permissions);
                resolve(thisEmployeeId);
            } catch (err){
                reject(err)
            }
        }
    });
}

const addPasswordToEmployee = (email,password) => { // after the admin created a password, a guest need to put password, no authorization needed
    return new Promise(async (resolve,reject) => {
        try{
            let employee = await getEmployeeCredsByEmail(email);
            
            if(!employee) {
                reject("email doesn't exist")
                return
            }
            
            if (employee.ready){
                reject("employee already has a password")
                return
            }

            bcrypt.hash(password,10,async (err,hash) => {
                if(err){
                    reject(err)
                }
                await updateEmployeeCredentials_DAL(employee._id,{password:hash,ready:true});
                resolve("success")
            });
        } catch(err){
            reject(err)
        }
    });
}

// update everything except password
const updateEmployee = (permissions,id,obj) => {
    return new Promise(async (resolve,reject) => {
        if(!lookForAuthorization(permissions)) { // authorization
            reject("access denied")
        } else {
            try {    
                // getting the jsons
                let details = await getAllEmployeesDetails(); 
                let permissions = await getAllEmployeesPermissions();

                // finding the index
                let thisEmployeeDetailsIndex = details.findIndex(employeeDetail => employeeDetail.employeeId == id);
                let thisEmployeePermissionsIndex = permissions.findIndex(employeePermissions => employeePermissions.employeeId == id);

                // saving the [created field]
                const created = details[thisEmployeeDetailsIndex].created

                // updating jsons lists
                details.splice(thisEmployeeDetailsIndex,1,{employeeId:id,fname:obj.fname,lname:obj.lname,sessTimeout:obj.sessTimeout,created});
                permissions.splice(thisEmployeePermissionsIndex,1,{employeeId:id,permissions:obj.permissions});

                // sending to data sources
                await postToAllEmployeesDetails(details);
                await postToAllEmployeesPermissions(permissions);
                await updateEmployeeCredentials_DAL(id,{email:obj.email});

                resolve("successfully updated");
            } catch (err) {
                reject(err)
            }
        }
    });

}

const deleteEmployee = (permissions,id) => {
    return new Promise(async (resolve,reject) => {
        if(!lookForAuthorization(permissions)) {  // authorization
            reject("access denied")
        } else {
            try {    
                // getting the jsons
                let details = await getAllEmployeesDetails(); 
                let permissions = await getAllEmployeesPermissions();

                // finding the index
                let thisEmployeeDetailsIndex = details.findIndex(employeeDetail => employeeDetail.employeeId == id);
                let thisEmployeePermissionsIndex = permissions.findIndex(employeePermissions => employeePermissions.employeeId == id);


                if(permissions[thisEmployeePermissionsIndex].permissions.includes("sys-admin"))
                {
                    reject("cant delete sys-admin")
                    return
                }

                // deleting and saving deleted object
                await deleteEmployeeCredentials_DAL(id)
                details.splice(thisEmployeeDetailsIndex,1);
                permissions.splice(thisEmployeePermissionsIndex,1);
                await postToAllEmployeesDetails(details);
                await postToAllEmployeesPermissions(permissions);

                resolve("successfully deleted");
                
            } catch (err) {
                reject(err)
            }
        }
    });
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  utils @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// returning employee id,email,password by email
const getEmployeeCredsByEmail = (email) => {
    return new Promise(async (resolve,reject) => {
        try {
            let [employeeCreds] = await getEmployeeCredentialsByEmail_DAL(email); // getting only the credentials
            if (!employeeCreds) {
               resolve(null);
            }
            resolve(employeeCreds);
        } catch (err) {
            reject(err)
        }
    });
}


const checkIfEmailExist = async (email) => {
    return await checkIfEmailExist_DAL(email);
} 



const completeEmployeeData = async (creds,password=false) => { // getting only Credentials and completing employee details from jsons
    let details = await getAllEmployeesDetails();
    let thisEmployeeDetails = details.find(employeeDetail => employeeDetail.employeeId == creds._id);
    
    let permissions = await getAllEmployeesPermissions();
    let thisEmployeePermissions = permissions.find(employeePermissions => employeePermissions.employeeId == creds._id);
    
    return mergeEmployeeData(creds,thisEmployeeDetails,thisEmployeePermissions,password)
}

const mergeEmployeeData = (creds,details,permissions,password=false) => { // merging Credentials details and permissions
    let mergedObj = {email:creds.email,ready:creds.ready,...details,...permissions};
    password?mergedObj.password = creds.password:null; // if password set to true, return obj with the password
    mergedObj._id = mergedObj.employeeId
    delete mergedObj.employeeId
    return mergedObj;
}

module.exports = {  
                    getAllEmployees,
                    addEmployeeADMIN,
                    getEmployeeByEmail,
                    getEmployeeById,
                    updateEmployee,
                    deleteEmployee,
                    addPasswordToEmployee
                 }