const AwardedData = require("../../models/Awarded");
let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");

async function projectTaskListController(req, res) {
    try {
        let userId = req.body.userId;
        let userType = req.body.userType;
        let projectId = req.body.projectId;
        let taskListName = req.body.taskListName;
        let taskListDes = req.body.taskListDes;
        console.log(req.body);

        if(userType === "client"){
            let data = await ClientsData.findOne({_id : userId});
            let project = await ProjectsData.findOne({_id  : projectId});
            if(data === null){
                throw new Error("Wrong credentials, please login again.")
            }
            if(project === null){
                throw new Error("Wrong credentials, please login again.")
            }
            let task = {
                name : data.clientFullName,
                date : Date.now(),
                taskListName : taskListName,
                taskListDes : taskListDes
            };
            
            project.taskLists.push(task);
            await project.save();
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Task added successfully"});
        }
        else{
            let data = await ProfessionalsData.findOne({_id : userId});
            let project = await ProjectsData.findOne({_id  : projectId});
            if(data === null){
                throw new Error("Wrong credentials, please login again.")
            }
            if(project === null){
                throw new Error("Wrong credentials, please login again.")
            }
            let task = {
                name : data.professionalFullName,
                date : Date.now(),
                taskListName : taskListName,
                taskListDes : taskListDes
            };
            
            project.taskLists.push(task);
            await project.save();
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Task added successfully"});

        }


    }
    catch (e) {
        console.log("Error while Adding KYC Details. ", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message });
    }
};


module.exports = projectTaskListController;