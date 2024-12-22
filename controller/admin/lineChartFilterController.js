let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

// Utility function to format weekly data for each quarter
function formatWeeklyData(data) {
    const weeklyData = Array(12).fill(0); // 12 weeks per quarter initialized to 0
    data.forEach(item => {
        const weekIndex = (item.week - 1) % 12; // Ensure week fits into the 12 weeks of the quarter
        weeklyData[weekIndex] = item.count;
    });
    return weeklyData;
}

// Utility function to format quarterly and weekly data
function formatQuarterlyAndWeeklyData(data) {
    const monthlyData = Array(12).fill(0); // Monthly data for the year
    const quarterlyWeeklyData = [[], [], [], []]; // Holds 12 weeks per quarter

    // Fill monthly and weekly data
    data.forEach(item => {
        const monthIndex = item._id.month - 1; // Month (0-11)
        monthlyData[monthIndex] += item.count;


        // Determine the quarter (Q1, Q2, Q3, Q4)
        const quarterIndex = Math.floor(monthIndex / 3);
        quarterlyWeeklyData[quarterIndex].push({
            week: item._id.week,
            count: item.count
        });
    });

    // // Format weekly data into 12 weeks per quarter
    const formattedQuarterlyWeeklyData = quarterlyWeeklyData.map(quarter =>
        formatWeeklyData(quarter)
    );

    return {
        monthlyData,
        formattedQuarterlyWeeklyData
    };
}

// Function to fetch clients and professionals data
async function getLineChartData(year) {
    try {
        const aggregateQuery = [
            {
                $match: {
                    accountCreationDate: {
                        $gte: new Date(`${year}-01-01`),
                        $lt: new Date(`${year + 1}-01-01`)
                    }
                }
            },
            {
                $project: {
                    month: { $month: "$accountCreationDate" },
                    week: { $week: "$accountCreationDate" } // Extract week number
                }
            },
            {
                $group: {
                    _id: { month: "$month", week: "$week" },
                    count: { $sum: 1 }
                }
            }
        ];

        // Aggregate client data
        const clientData = await ClientsData.aggregate(aggregateQuery);

        // Aggregate professional data
        const professionalData = await ProfessionalsData.aggregate(aggregateQuery);


        // Format client data
        const clientFormattedData = formatQuarterlyAndWeeklyData(clientData);

        // // Format professional data
        const professionalFormattedData = formatQuarterlyAndWeeklyData(professionalData);

        return {
            clientMonthlyData: clientFormattedData.monthlyData,
            professionalMonthlyData: professionalFormattedData.monthlyData,
            clientWeeklyQuarterlyData: clientFormattedData.formattedQuarterlyWeeklyData,
            professionalWeeklyQuarterlyData: professionalFormattedData.formattedQuarterlyWeeklyData
        };
    } catch (error) {
        console.error("Error fetching line chart data:", error);
        throw error;
    }
}


async function lineChartFilterController(req, res){
    try{

        const { year } = req.body;
        if (!year || isNaN(year)) {
            throw new Error("Please provide a valid year.")
        }

        const lineChartData = await getLineChartData(parseInt(year));

        return res.status(200).json({
            status: "success",
            message: "Line chart data fetched successfully.",
            data: lineChartData
        })
            
    }
    catch(e){
        console.log("Error while Fetching Line Chart Data", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = lineChartFilterController;