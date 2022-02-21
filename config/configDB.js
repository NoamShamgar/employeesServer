const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASS}@cinemacluster.vnjed.mongodb.net/cinemaDB?retryWrites=true&w=majority`,
    ()=>{
        console.log("\x1b[32m","   successfully connected to employees database");
        require("../helpers/sysadmin"); // adding a sysadmin in case not exist
});
