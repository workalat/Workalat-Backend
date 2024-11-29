const AdminFeaturesData = require("../../models/AdminFeatures");

async function addPointsWalletController(req, res) {
  try {
    const { point, amount } = req.body;

    const result = await AdminFeaturesData.updateOne(
      {},
      { $push: { points: { point, amount } } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({
        status: "success",
        userStatus: "SUCCESS",
        message: "Point added successfully.",
      });
    } else {
      throw new Error("Failed to add point.");
    }
  } catch (e) {
    console.error("Error while adding a point.", e);
    res.status(400).json({
      status: "fail",
      userStatus: "FAILED",
      message: e.message,
    });
  }
}

module.exports = addPointsWalletController;
