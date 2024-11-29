const AdminData = require("../../models/Admin");
async function showAllAdminController(req, res){
    try{
        let data = await AdminData.find().select({
            admin_password : 0,
            supportTicket : 0,
            tokens : 0
        });

        res.status(200).json({status : "success", userStatu : "SUCCESS", message : "Admin Data Found Successfully", data});
    }
    catch(e){
        console.log("Error while adding Admins", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showAllAdminController;