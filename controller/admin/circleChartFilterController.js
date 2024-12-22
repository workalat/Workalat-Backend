const ProjectsData = require("../../models/Project");

async function circleChartFilterController(req, res) {
    try {
        const { year } = req.body; // Retrieve the year from query params
        if (!year || isNaN(year)) {
            return res.status(400).json({ status: "fail", message: "Invalid year provided" });
        }

        const startOfYear = new Date(year, 0, 1); // January 1st of the given year
        const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999); // December 31st of the given year

        // Helper function to filter data by quarters
        const getQuarterData = async (startMonth, endMonth) => {
            const start = new Date(year, startMonth, 1); // Start of the quarter
            const end = new Date(year, endMonth + 1, 0, 23, 59, 59, 999); // End of the quarter (last day)

            const [awarded, openLead, rejected] = await Promise.all([
                ProjectsData.find({
                    awardedStatus: "awarded",
                    projectTimeStamp: { $gte: start, $lte: end },
                }).countDocuments(),
                ProjectsData.find({
                    awardedStatus: "unawarded",
                    projectTimeStamp: { $gte: start, $lte: end },
                }).countDocuments(),
                ProjectsData.find({
                    projectStatusAdmin: false,
                    projectTimeStamp: { $gte: start, $lte: end },
                }).countDocuments(),
            ]);

            return { awarded, openLead, rejected };
        };

        // Get yearly data
        const yearlyData = await getQuarterData(0, 11);

        // Get quarterly data
        const quarterlyData = await Promise.all([
            getQuarterData(0, 2), // Jan-Mar
            getQuarterData(3, 5), // Apr-Jun
            getQuarterData(6, 8), // Jul-Sep
            getQuarterData(9, 11), // Oct-Dec
        ]);

        // Construct the final result
        const result = [
            yearlyData, // Data for the entire year
            ...quarterlyData, // Data for each quarter
        ];

        return res.status(200).json({
            status: "success",
            message: "Circle chart data fetched successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error fetching circle chart data:", error);
        return res.status(500).json({
            status: "fail",
            message: "Internal server error",
            error: error.message,
        });
    }
}

module.exports = circleChartFilterController;
