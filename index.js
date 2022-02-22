require("dotenv").config()
const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser");

const app = express();
require("./config/configDB"); // connecting to DB

app.use(cors({credentials: true, origin: 'https://cinema-project-ui.herokuapp.com'})); // alowwing requests only from port 3000 and including cookies in the transfers
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser()); // to read and send cookies

const {extractToken} = require("./auth/jwt") // calling a function that extract permissions from the encoded jwt in header to res.locals
app.use(extractToken); // middleware that checks user cookies and put his permissions in the res object

const employeeRouter = require("./routers/employees");
app.use("/employees",employeeRouter);

const MemberRouter = require("./routers/members");
app.use("/members",MemberRouter);

const MovieRouter = require("./routers/movies");
app.use("/movies",MovieRouter);

const subscriptionRouter = require("./routers/subscriptions");
app.use("/subscriptions",subscriptionRouter);

const authRouter = require("./routers/auth");
app.use("/auth",authRouter);


app.use("/checkSession",(req,res)=>{res.json()}); // once a minute the client sends a "check" to check exist session, if the session is over the middlewares will kick the user out, if its not, this will return that session in valid

app.use((req,res) => { // error handling, this is the next function after the routers, if it triggers there was an error.
  console.log('\x1b[36m%s\x1b[0m',"inside error handler"); // console color change
  
  if(!res.locals.err){ // it didnt make it to the routers, wrong path.
      console.log(`wrong resource -  ${req.path} or wrong method [${req.method}]`);
      res.status(422).json(`no such resource -  ${req.path} or wrong method [${req.method}]`);
  }
  
  if(res.locals.err && res.locals.err.response) { // error came from subscription WS
    console.log(res.locals.err.response);
    res.status(400).json(res.locals.err);
  } else { // generic error
    console.log(res.locals.err);
    res.status(401).json(res.locals.err);
  }

});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port,()=>console.log("employees server has started and running on port", port));