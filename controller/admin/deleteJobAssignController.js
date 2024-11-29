let AdminFeaturesData = require("../../models/AdminFeatures");
async function deleteJobAssignController(req, res) {
  try {
    let mode = req.body.mode; //Category/Service
    let type = req.body.type; //Name of category/service

    let adminFeatureData = await AdminFeaturesData.findOne();

    if (mode === "category") {
      if (adminFeatureData.categoryQuesions.length > 0) {
        adminFeatureData.categoryQuesions =
          adminFeatureData.categoryQuesions.filter((val) => {
            if (val.type !== type) {
              return val;
            }
          });
        adminFeatureData.markModified("categoryQuesions");
        await adminFeatureData.save();
        res
          .status(200)
          .json({
            status: "success",
            userStatu: "SUCCESS",
            message: "Assigning Deleted Successfully",
          });
      }
    } else {
      if (adminFeatureData.serviceQuestions.length > 0) {
        adminFeatureData.serviceQuestions =
          adminFeatureData.serviceQuestions.filter((val) => {
            if (val.type !== type) {
              return val;
            }
          });
        adminFeatureData.markModified("serviceQuestions");
        await adminFeatureData.save();
        res
          .status(200)
          .json({
            status: "success",
            userStatu: "SUCCESS",
            message: "Assigning Deleted Successfully",
          });
      }
    }
  } catch (e) {
    console.log("Error while adding categories project", e);
    res
      .status(400)
      .json({ status: "fail", userStatus: "FAILED", message: e.message });
  }
}

module.exports = deleteJobAssignController;
