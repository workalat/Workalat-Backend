let ProfessionalsData = require("../../models/Professional");

async function showCertificateController(req, res) {
    try {
        let  userId  = req.body.userId;

        let data = await ProfessionalsData.findOne({_id : userId}).select({certifications : 1});

        res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: data });
    } catch (e) {
        // console.log("Error while adding professional's details", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message });
    }
};


module.exports = showCertificateController;