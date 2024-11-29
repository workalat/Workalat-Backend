const AdminData = require("../../models/Admin");
async function addAdminController(req, res){
    try{
        let admin_name = req.body.admin_name;
        let admin_email = req.body.admin_email;
        let admin_password = req.body.admin_password;
        let admin_status = req.body.admin_status;  //user/system/support
        console.log(req.body);

        let findAdmin = await AdminData.findOne({admin_email: admin_email});

        if(findAdmin !== null ){
            throw new Error("This email already exists, please add different email");
        }

        let admin = await AdminData.create({
            admin_name : admin_name,
            admin_email : admin_email,
            admin_password: admin_password,
            admin_status : admin_status
        });

        res.status(200).json({status : "success", userStatu : "SUCCESS", message : "Admin created Successfully"});
    }
    catch(e){
        console.log("Error while adding Admins", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addAdminController;