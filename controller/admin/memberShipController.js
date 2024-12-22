const ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");

async function memberShipController(req, res){
    try{
        let data = await ProfessionalsData.find({membershipStatus : { $ne: "closed" }}).select({
            membershipStatus : 1,
            memberShipExpirationDate : 1,
            professionalFullName : 1,
            professionalPictureLink : 1,
            membershipTransactionHistory : 1,
        });

        let finalData = await Promise.all(data.map(async (val, i)=>{
                let updateData = { ...val._doc }; // "_doc" is used to access the actual document
                if(val !== null){
                      // Safely access the last transaction ID
                      const lastTransaction = val.membershipTransactionHistory?.[val.membershipTransactionHistory.length - 1];
                      updateData.sessionId = lastTransaction?.transactionId || null; // Assign the value to sessionId
                      delete updateData.membershipTransactionHistory;
                  };
                
                return updateData;
            
    }));


        res.status(200).json({ status: "success", userStatus: "SUCCESS",data : finalData.reverse()});
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = memberShipController;