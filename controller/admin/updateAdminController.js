let verificationAdmin = require("../../middleware/verificationAdmin");
const AdminData = require("../../models/Admin");

async function updateAdminController(req, res) {
  try {
        let adminId = req.body.adminId;
        let adminEmail = req.body.adminEmail;
        let adminName = req.body.adminName;
        let adminRole = req.body.adminRole;
        let adminPassword = req.body.adminPassword;

        let admin = await AdminData.findOne({_id : adminId});
        if (!admin) {
            throw new Error("Invalid admin ID")
        }
        admin.admin_name = adminName;
        admin.admin_email = adminEmail;
        admin.admin_status = adminRole;

        if(adminPassword || adminPassword?.length > 0){
            admin.admin_password = adminPassword;
        }

        await admin.save();

        res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Admin data updated successfully." });


     } catch (e) {
    // console.log("Verification Error", e);
    console.log("Error while updating Admin Data.", e);
    res
      .status(400)
      .json({ status: "fail", userStatus: "FAILED", message: e.message });
  }
}

module.exports = updateAdminController;
 