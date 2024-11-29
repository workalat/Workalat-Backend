let verificationAdmin = require("../../middleware/verificationAdmin");
const AdminData = require("../../models/Admin");

async function verifyAdminTokenController(req, res) {
  let adminToken = req.body.adminToken;
  console.log(req.body);
  try {
        let verify = await verificationAdmin({ token: adminToken });

        if (verify.verified === true || verify.verified) {
                    let d = await AdminData.findOne({ _id: verify._id }).select({
                      admin_name: 1,
                      adminPictureLink: 1,
                      admin_email: 1,
                      admin_status: 1,
                      accountCreationDate: 1,
                      lastLoginDate: 1,
                    });
                    if (d === null) {
                        throw Error("No Data Found, please login again.");
                    }
                    else {
                        let data = {
                            name: d.admin_name,
                            picture: d.adminPictureLink,
                            email: d.admin_email,
                            status: d.admin_status,
                            // accountCreationDate: d.accountCreationDate,
                            // lastLoginDate: d.lastLoginDate,
                            verify : true
                        }
                        res.status(200).json({ status: "success", userStatus: "SUCCESS",msg: "User is verified", data: data });
                    }             
          }
     } catch (e) {
    // console.log("Verification Error", e);
    console.log("Error while verifying Login Token.", e);
    res
      .status(400)
      .json({ status: "fail", userStatus: "FAILED", message: e.message });
  }
}

module.exports = verifyAdminTokenController;
 