const jsonFile = require("jsonfile")
const path = "./json/details.json"


const getAllEmployeesDetails = async () => {
    return await jsonFile.readFile(path);
}

const postToAllEmployeesDetails = async (obj) => {
    return await jsonFile.writeFile(path,obj);
}

module.exports = {getAllEmployeesDetails,postToAllEmployeesDetails}


