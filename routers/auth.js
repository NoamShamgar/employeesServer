const express = require("express");
const {login} = require("../controllers/login");
const {getTokenWithRefreshToken} = require("../auth/jwt");


const router = express.Router();


router.route("/login")
.post(async (req,res,next)=>{
    try {
        const {token,refreshToken,employee} = await login(req.body.email,req.body.password); // checking creds and get tokens
        res.cookie("aTOK",token,{httpOnly:true,maxAge:120 * 60 * 1000}); // set the cookie to destroy after 2 hours - max session timeout
        res.json({refreshToken,employee});
    } catch(err) {  
        res.locals.err = err;
        next();
    }
})

// when logout, just destroying the cookie
router.route("/logout")
.delete(async (req,res,next) => {
    try {
        res.clearCookie("aTOK");
        res.cookie("aTOK","",{maxAge:0}); // destroying this cookie
        res.json("cleared cookies");
    } catch(err) {  
        res.locals.err = err;
        next();
    }
})

// user trying to refresh his JWT with refresh token
router.route("/refresh")
.post(async (req,res,next)=>{
    try{
        const aTOK = await getTokenWithRefreshToken(req.body.refreshToken);
        res.clearCookie("aTOK");
        res.cookie("aTOK",aTOK,{httpOnly:true,maxAge:120 * 60 * 1000}); // set the cookie to destroy when the token is no more valid
        res.json("generated a new access token");
    } catch(err) {  
        res.locals.err = err;
        next();
    }
});



module.exports = router;