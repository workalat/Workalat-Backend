const AdminFeaturesData = require("../../models/AdminFeatures");

async function deleteServiceController(req, res) {
  try {
    const  category = req.body.category;
    const serviceValue  = req.body.serviceValue;
    const serviceToDelete = serviceValue.toLowerCase();

    // Fetch the AdminFeatures document
    let data = await AdminFeaturesData.findOne();

    if (!data) {
      return res.status(404).json({
        status: "fail",
        userStatus: "FAILED",
        message: "Data not found.",
      });
    }

    // Remove the service from the specified category
    data.services = data.services.map((serviceObj) => {
      if (serviceObj.category === category) {
        serviceObj.service = serviceObj.service.filter(
          (service) => service.toLowerCase() !== serviceToDelete
        );
      }
      return serviceObj;
    });

    // Remove service-related questions from serviceQuestions
    data.serviceQuestions = data.serviceQuestions.filter(
      (question) => question.type !== serviceToDelete
    );

    // Save the updated document
    await data.save();

    res.status(200).json({
      status: "success",
      userStatus: "SUCCESS",
      message: `${serviceValue.toUpperCase()} deleted successfully.`,
    });
  } catch (e) {
    console.error("Error while deleting service.", e);
    res.status(400).json({
      status: "fail",
      userStatus: "FAILED",
      message: e.message,
    });
  }
}

module.exports = deleteServiceController;
