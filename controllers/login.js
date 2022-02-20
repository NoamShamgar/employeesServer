const {checkLogin} = require("../auth/login");
const {getToken} = require("../auth/jwt");

// login function, calling other functions to verify given creds, and returning tokens and the employee
const login = (email,password) => {
    return new Promise(async (resolve,reject) => {
        try {
            const employee = await checkLogin(email,password); // if check login will succeed, it will return the employee; if something is wrong it will get in the catch
            delete employee.password; // password won't leave the server to the client side.
            delete employee.ready;
            let tokens = await getToken(employee._id,employee.sessTimeout);
            resolve({...tokens,employee});

        } catch (err) {
            reject(err)
        } 
    });
}


module.exports = {login}