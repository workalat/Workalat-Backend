const AdminData = require("../../models/Admin");
let bcrypt = require("bcryptjs");
async function adminLoginController(req, res){
    try{
        let email = req.body.email;
        let password = req.body.password;

        let admin = await AdminData.findOne({admin_email : email});
        if (admin === null) {
            throw new Error("Invalid Email or Password.");
        }
        let verify = await bcrypt.compare(password, admin.admin_password);

        if(verify || verify === true){ 
            let token = await admin.generateAuthToken();
            admin.lastLoginDate = Date.now();
            await admin.save();
            res.status(200).json({
                status: "success",
                userStatus: "SUCCESS",
                message : "Loggedin Successfully!",
                token: token,
            });
        }
        else{
            throw new Error("Invalid Email or Password.")
        }}
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = adminLoginController;