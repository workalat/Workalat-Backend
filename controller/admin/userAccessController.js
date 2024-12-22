const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");

async function userAccessController(req, res) {
  try {

        let userId = req.body.userId;
        let userType = req.body.userType;

        if( userType === "client"){
            let data = await ClientsData.findOne({_id : userId});
            if(data === null){
                throw new Error("No Data Found!")
            }
            let token = await data.generateAuthToken();
            await data.save();
            res.status(200).json({
                status: "success",
                userStatus: "SUCCESS",
                message : "User Account accessed successfully",
                data : {
                    token,
                    userType : "client"
                }
            });
        }
        else{
            let data = await ProfessionalsData.findOne({_id : userId});
            if(data === null){
                throw new Error("No Data Found!")
            }
            let token = await data.generateAuthToken();
            await data.save();
            res.status(200).json({
                status: "success",
                userStatus: "SUCCESS",
                message : "User Account accessed successfully",
                data : {
                    token,
                    userType : "professional"
                }
            });
        }



     } catch (e) {
    // console.log("Verification Error", e);
    console.log("Error while Accessing user Account.", e);
    res
      .status(400)
      .json({ status: "fail", userStatus: "FAILED", message: e.message });
  }
}

module.exports = userAccessController;
 