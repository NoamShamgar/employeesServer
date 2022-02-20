const {getEmployeeByEmail} = require("../controllers/employee")
const {getAllEmployeesPermissions} = require("../DAL/permissionsJSON")

const bcrypt = require("bcrypt")

const checkLogin = (email,password) => {
    return new Promise(async (resolve,reject) => {
        try{
           const employee = await getEmployeeByEmail(email);
            if(!employee) {
                reject("invalid email");
            }

            if(!employee.ready) {
                reject("employee is not ready");
            }

            bcrypt.compare(password,employee.password,(err,result)=>{ // comparing given password and hash in the DB
                if(err) {
                    reject(err);
                }
                
                if(result) {
                    resolve(employee)
                } else {
                    reject("wrong password")
                }
            });

        } catch (err) {
            reject(err)
        }
    })

}

module.exports = {checkLogin}