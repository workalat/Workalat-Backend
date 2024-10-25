let AwardedData = require("../../models/Awarded");
let ClientsData = require("../../models/Client");
const ProjectsData = require("../../models/Project");

async function showAllAwardedProfController(req, res){
    try{
        let userId = req.body.userId;
        console.log(userId);
        let data = await ProjectsData.find({$and : [{awardedProfessionalId : userId},{ projectStatus: { $ne: 'completed' }}]}).select({
            professionalId : 1,
            ProjectId : 1,
            awardedStatus  : 1,
            serviceDes : 1, 
            serviceLocationPostal : 1,
            serviceLocationTown : 1,
            serviceTitle  : 1,
            projectTimeStamp  : 1, 
            projectStatusClient : 1,
            projectStatusAdmin : 1,
            projectStatusProfessional : 1,
            projectStatus : 1,
            serviceNeeded : 1,
            clientChatId : 1,
            clientName : 1,
            clientPictureLink : 1,
            clientId : 1
        });
        console.log(data.length);
        if(data.length < 1){
            res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: []});
        }
        else{
            // let d = await Promise.all(
            //     data.map(async (award) => {
            //         let clientData = await ClientsData.findOne({ _id: award.clientId }).select({
            //             clientFullName: 1,
            //             isClientPicture: 1,
            //             clientPictureLink: 1
            //         });
            //         if(clientData !== null){
            //             return { ...award.toObject(), ...clientData.toObject() };
            //         }

            //         // Merge the awarded data with the client's data
            //         // return { ...award.toObject(), ...clientData.toObject() };
            //     })
            // );
            // // console.log(data)
            // console.log(d);
            // if(d === null){
            //     throw new Error("No Data Found , please login again");
            // }
            // else{
                res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: data });
            // }
        }
    }
    catch(e){
        console.log("Error while adding fetching propsals data", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showAllAwardedProfController;