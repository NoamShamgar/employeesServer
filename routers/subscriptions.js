const express = require("express");
const {getAllSubscriptions,getSubscriptionById,addSubscription,updateSubscription,deleteSubscription,addMovieToSubscription} = require("../controllers/subscription");

const router = express.Router();

router.route("/")
.get(async (req,res,next)=>{
    try {
        res.json(await getAllSubscriptions(res.perm)) // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).post(async (req,res,next)=>{
    try{
        console.log(req.body);
        res.json(await addSubscription(res.perm,req.body)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
});

router.route("/:id")
.get(async (req,res,next)=>{
    try{
        res.json(await getSubscriptionById(res.perm,req.params.id)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).put(async (req,res,next)=>{
    try{
        res.json(await updateSubscription(res.perm,req.params.id,req.body)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).delete(async (req,res,next)=>{
    try{
        res.json(await deleteSubscription(res.perm,req.params.id)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
})


router.route("/:id/movies")
.post(async (req,res,next)=>{
    try{
        res.json(await addMovieToSubscription(res.perm,req.params.id,req.body)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
});



module.exports = router;