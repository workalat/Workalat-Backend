let ProjectsData = require("../../models/Project");
async function showSingleProjectProfController(req, res) {
    try {
        let { projectId } = req.body;

        // Using $and condition correctly
        let project = await ProjectsData.findOne({
            _id: projectId,
            $and: [
                { projectStatusAdmin: true },
            ]
        }).select({
            awardedDetails: 0,
            awardedTimeStamp: 0,
            paymentStatus: 0,
            confirmedPrice: 0,
            paymentInvoiceNumber: 0,
            awardedStatus: 0,
            projectStatusProfessional: 0,
            projectStatusAdmin: 0,
            maxBid: 0,
            isClientEmailVerify: 0,
            isClientPhoneNoVerify: 0,
            clientPhoneNo: 0,
            clientEmail: 0,
            clientUsername: 0,
        });
        console.log(project);
        if(project === null ){
            res.status(400).json({ status: "fail", userStatus: "FAIL", message: "No Data Found, the link you entered maybe invalid or broken, or maybe this project is not active anymore.", data: [] })
        }
        else{
            res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: project });
        }
    } catch (e) {
        // if(e.kind === "ObjectId"){res.json({ status: "fail", userStatus: "FAIL", message: "No Data Found, the link you entered maybe invalid or broken, or maybe this project is not active anymore.", data: [] })}
        console.log("Error while fetching project", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message, kind : e.kind });
    }
}

module.exports = showSingleProjectProfController;