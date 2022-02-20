const jsonFile = require("jsonfile")
const path = "./json/permissions.json"

const getAllEmployeesPermissions = async () => {
    return await jsonFile.readFile(path);
}

const postToAllEmployeesPermissions = async (obj) => {
    return await jsonFile.writeFile(path,obj);
}

module.exports = {getAllEmployeesPermissions,postToAllEmployeesPermissions}