const express = require("express");
const {getAllMembers,getMemberById,getMemberSubscription,addMember,updateMember,deleteMember} = require("../controllers/member");

const router = express.Router();

router.route("/")
.get(async (req,res,next)=>{
    try {
        res.json(await getAllMembers(res.perm)) // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).post(async (req,res,next)=>{
    try{
        res.json(await addMember(res.perm,req.body)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
});

router.route("/:id")
.get(async (req,res,next)=>{
    try{
        res.json(await getMemberById(res.perm,req.params.id)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).put(async (req,res,next)=>{
    try{
        res.json(await updateMember(res.perm,req.params.id,req.body)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).delete(async (req,res,next)=>{
    try{
        res.json(await deleteMember(res.perm,req.params.id)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
});

router.route("/:id/subscription") // getting movies that member subbed to
.get( async(req,res)=>{
    try{
        res.json(await getMemberSubscription(req.params.id));
    } catch(err) {
        res.locals.err = err;
        next();
    }
});


module.exports = router;