const express = require("express");
const {getAllEmployees,getEmployeeById, addEmployeeADMIN,addPasswordToEmployee,updateEmployee,deleteEmployee, getEmployeeByEmail} = require("../controllers/employee");
const { checkIfIdExist } = require("../helpers/employee");

const router = express.Router();

router.route("/")
.get(async (req,res,next)=>{
    try {
        res.json(await getAllEmployees(res.perm)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).post(async (req,res,next)=>{
    try{
        res.json(await addEmployeeADMIN(res.perm,req.body)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
});

router.route("/:id")
.get(async (req,res,next)=>{
    try{
        await checkIfIdExist(req.params.id) // checking if id exist
        res.json(await getEmployeeById(res.perm,req.params.id)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).put(async (req,res,next)=>{
    try{
        await checkIfIdExist(req.params.id) // checking if id exist
        res.json(await updateEmployee(res.perm,req.params.id,req.body)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).delete(async (req,res,next)=>{
    try{
        await checkIfIdExist(req.params.id)  // checking if id exist
        res.json(await deleteEmployee(res.perm,req.params.id)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
})

router.route("/setpass") // new user trying to set a password for his user
.put(async (req,res,next)=>{
    try{
        res.json(await addPasswordToEmployee(req.body.email,req.body.password)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
})



module.exports = router;