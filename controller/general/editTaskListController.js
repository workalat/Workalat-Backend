let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");

async function editTaskListController(req, res){
    try{
        let projectId = req.body.projectId;
        let taskId = req.body.taskId;
        let taskListName = req.body.taskListName;
        let taskListDes = req.body.taskListDes;

        let data = await ProjectsData.findOne({_id : projectId}).select({taskLists : 1});


        data.taskLists[taskId].taskListName = taskListName;
        data.taskLists[taskId].taskListDes =taskListDes; 
        data.taskLists[taskId].date =Date.now(); 
        data.markModified('taskLists')

        await data?.save();


                res.status(200).json({status : "success", userStatus : "SUCCESS",message : "Task List edited Successfully."})
            
    }
    catch(e){
        console.log("Error while marking fetching Dashboard Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = editTaskListController;