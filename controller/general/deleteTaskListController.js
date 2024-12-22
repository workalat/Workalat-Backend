const ProjectsData = require("../../models/Project");

async function deleteTaskListController(req, res) {
  try {
    let projectId = req.body.projectId;
    let taskId = req.body.taskId;

    let data = await ProjectsData.findOne({_id : projectId}).select({taskLists : 1});
    console.log(data);
    data.taskLists = data.taskLists.filter((val, i)=> i !=taskId);
    data.markModified('taskLists')

    await data?.save();


    res.status(200).json({status : "success", userStatus : "SUCCESS",message : "Task List Deleted Successfully."})
            


  } catch (e) {
    console.error("Error while deleting Task list.", e);
    res.status(400).json({
      status: "fail",
      userStatus: "FAILED",
      message: e.message,
    });
  }
}

module.exports = deleteTaskListController;
