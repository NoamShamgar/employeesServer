const {getAllEmployeesPermissions} = require("../DAL/permissionsJSON")
const {addEmployeeADMIN,addPasswordToEmployee} = require("../controllers/employee")
const readLine = require("readline")
const rl = readLine.createInterface({input:process.stdin,output:process.stdout})


checkforSysAdmin()
function checkforSysAdmin () { // checking if sys-admin exists, if not, creating it
    return new Promise(async (resove,reject) => {
        try{
            let allPerm = await getAllEmployeesPermissions(); // getting all permissions from the json = [{employeeId,permissions},{...}]
            let exist = allPerm.find(employeePermissions =>  // looking inside the big array
                 employeePermissions.permissions.find(singlePermission => singlePermission == "sys-admin") // inside each obj, looking inside permissions array    
            )

            if (!exist){
                console.log("      cant find sysAdmin");
                createSysAdmin();
            } else {
                console.log("      sysAdmin exist");
            }


        } catch (err) {
            console.error(err);
        }
    });
}

const createSysAdmin = () => { // creating sys-admin, getting data through the CLI
    console.log("         creating sysAdmin . . .");
    console.log("________________");

    rl.question("set email for the SYS-ADMIN \n",async (email)=>{
        rl.question("set a password for the SYS-ADMIN \n",async (password)=>{
       
   
        const newAdmin = {
            fname:"sys",
            lname:"admin",
            email:email.trim(),
            permissions:["sys-admin"],
            sessTimeout:120
        }
        await addEmployeeADMIN(["sys-admin"],newAdmin);
        console.log("here");
        await addPasswordToEmployee(email.trim(),password.trim())
            console.log("sysAdmin created successfully!");
            console.log("\x1b[0m");
        });
    });
}