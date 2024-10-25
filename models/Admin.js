require("dotenv").config();
let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");


let AdminSchema  = new mongoose.Schema({
    admin_name : {
        type : String   
    },
    // admin_username: {
    //     type : String   
    // },
    admin_email  : {
        type: String,
        required: true,
        unique: [true, "Email already exists"]
    },
    admin_password  : {
        type : String
    },
    admin_status: {
        type : String 
    },
    supportTicket : {
        type: Array,
        default  : []
    },
    accountCreationDate : { 
        type : Date,
        default : Date.now()
    },
    tokens :[{
        token: {
            type: String
        }
    }],
    
    
})


AdminSchema.methods.generateAuthToken  = async function(){
    try{
        let token = jwt.sign({
            _id: this._id,
            admin_status : this.admin_status
            }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        // console.log("Token Generated in Model 2", token); //Checking if the token has been generated 
        await this.save()
        return(token)
    }
    catch(e){
        console.log("Auth generating Error", e);
    }
}


//Hashing user password
AdminSchema.pre("save", async function(next){
    if(this.isModified("admin_password")){
        this.admin_password = await bcrypt.hash(this.admin_password, 10);
    }
    next();
});

let AdminData =  new mongoose.model("AdminData", AdminSchema);

module.exports = AdminData;