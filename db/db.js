require("dotenv").config()
let mongoose = require("mongoose")

mongoose.connect(`${process.env.DATABASE_URL}`,{
    connectTimeoutMS: 30000
}).then(()=>{
    console.log("Database Connected Successfully")
}).catch((e)=>{
    console.log("Database Connection Error Message", e.message);
    console.log("Database Connection Full Error", e);
});