const ClientsData = require("../../models/Client");
const ProjectsData = require("../../models/Project");
async function showAllLeadsController(req, res){
    try{

        let data = await ProjectsData.find().select({
            clientName : 1,
            serviceNeeded : 1,
            serviceLocationTown : 1,
            projectTimeStamp : 1, 
            projectStatusAdminString : 1,
            proposals : 1,
            clientId  :1
        });
        console.log(data.length);
        let finalData = await Promise.all(data.map(async (val, i)=>{
                let clientData = await ClientsData.findOne({_id : val.clientId}).select({clientFullName : 1});
                let projectWithoutProposals = { ...val._doc }; // "_doc" is used to access the actual document
                if(clientData !== null){
                    projectWithoutProposals.clientName = clientData.clientFullName;
                };
                projectWithoutProposals.totalProposals = val.proposals ? val.proposals.length : 0;
                delete projectWithoutProposals.proposals;
                return projectWithoutProposals;
        }));
        console.log("Final Data", finalData);

        res.status(200).json({ status: "success", userStatus: "SUCCESS", data: finalData.reverse() });
     
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showAllLeadsController;