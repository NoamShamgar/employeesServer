require("dotenv").config()
const jwt = require("jsonwebtoken");
const {getEmployeePermissions,getEmployeeSessTime} = require("../helpers/employee")


const getToken = async (id,sessTime) => { // executing after a user logged in, returing new JWT and refresh token
    const token = jwt.sign({id:id},process.env.JWT_SECRET,{expiresIn:"5m"});
    const refreshToken = jwt.sign({id},process.env.JWT_REFRESH_SECRET,{expiresIn:`${sessTime.toString()}m`}); // setting session time to the refresh token, when it will pass there is no more access
    
    return {token,refreshToken};
}

// middleware function that extract jwt token and adding user permissions to res to be used across the project;
const extractToken = (req,res,next) => {
    const token = req.cookies.aTOK; // getting the token
    if (req.originalUrl.includes("/auth")){ // if this is a request from login, there is a chance the redux is down due to a client refresh, in that case cookies can be automaticaly refreshed.
        res.perm = [];
        next();
        return;
    }
    if (token) {
       jwt.verify(token,process.env.JWT_SECRET,async (err,obj)=>{ // verifying the token
            if (err){
                console.log("invalid token");
                console.dir("err:   ->   ",err);
                res.status(400).json(err);
            } else {
                try{
                    const sessTimeout = await getEmployeeSessTime(obj.id) // what is the max session time (minutes).
                    const sessionTime = ((new Date().getTime() - obj.iat * 1000)/60000); // get how long this session is (minutes).
                  
                    // checking if session exceeded max time allowed
                    // the basic JWT expiry is not enough because it will work only by steps of 10.
                    // if the user has 15m for his session, the second token will work for extra 5 minutes
                    if (sessionTime > sessTimeout) {
                        res.clearCookie("aTOK");
                        res.cookie("aTOK","",{maxAge:0}); // destroying this cookie
                        res.status(401).json("session over"); // client need to logout
                        return
                    }
                    res.perm = await getEmployeePermissions(obj.id); // if permissions exist, put it in res.locals
                    next();
                } catch(err) { // in case of error in getting permissions
                    console.log(err);
                    res.status(500).json(err);
                }
            }
       })     
    } else {
        res.perm = []; // if there is no token in the headers, put empty permissions array
        next()
    }
}

// getting a refresh token and return a new access token
const getTokenWithRefreshToken = (refreshToken) => {
       return new Promise((resolve,reject)=>{
            return jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET,(err,obj)=>{ // verifying the token
                if (err){
                    reject("invalid token");
                } else {
                    const token = jwt.sign({id:obj.id},process.env.JWT_SECRET,{expiresIn:"5m"})
                    resolve(token)
                }
            });
        });
}

module.exports = {getToken,extractToken,getTokenWithRefreshToken}