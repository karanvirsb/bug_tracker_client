import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useQuery } from "react-query";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import { useAppSelector } from "../../../Hooks/hooks";
import Spinner from "../../../Components/Spinner";
ChartJS.register(ArcElement, Tooltip, Legend);

type chartDataType = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
};

type stat = {
    projectId: string;
    ticketSeverity: string;
    ticketStatus: string;
    ticketType: string;
    _id: string;
};

const statsBackgroundColor = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
];

const statsBorderColor = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
];

const Statistics = () => {
    const [loading, setLoading] = useState(true);
    const [chartDataStatus, setChartDataStatus] = useState<chartDataType>({
        labels: ["Open", "Todo", "In Progress", "To Be Tested", "Closed"],
        datasets: [
            {
                label: "# of status",
                data: [1, 1, 1, 1, 1],
                backgroundColor: statsBackgroundColor,
                borderColor: statsBorderColor,
                borderWidth: 1,
            },
        ],
    });
    const [chartDataType, setChartDataType] = useState<chartDataType>({
        labels: ["Bug", "Feature", "Error", "Issue"],
        datasets: [
            {
                label: "# of type",
                data: [1, 1, 1, 1],
                backgroundColor: statsBackgroundColor,
                borderColor: statsBorderColor,
                borderWidth: 1,
            },
        ],
    });
    const [chartDataSevertiy, setChartDataSevertiy] = useState<chartDataType>({
        labels: ["Critical", "High", "Medium", "Low", "None"],
        datasets: [
            {
                label: "# of severitys",
                data: [1, 1, 1, 1, 1],
                backgroundColor: statsBackgroundColor,
                borderColor: statsBorderColor,
                borderWidth: 1,
            },
        ],
    });
    const groupInfo = useAppSelector((state) => state.persistedReducer.group);

    // fetching project ids based on group id
    const fetchProjectIds = async (): Promise<
        { _id: string; projectId: string }[]
    > => {
        const resp = await axiosPrivate(
            `/project/group/projectIds/${groupInfo.groupId}`,
            { method: "GET" }
        );
        return resp.data;
    };

    // fetching statistics
    const fetchStatistics = async (projectIds: string[]): Promise<stat[]> => {
        const resp = await axiosPrivate("/ticket/stats", {
            method: "POST",
            data: { projectIds: projectIds },
        });
        return resp.data;
    };

    const statistics = async () => {
        const projectIdsResp = await fetchProjectIds();
        const projectIds = projectIdsResp?.map(
            (project: { _id: string; projectId: string }) => {
                return project.projectId;
            }
        );
        return await fetchStatistics(projectIds);
    };

    const { data: stats, status: statsStatus } = useQuery(
        ["statistics"],
        statistics
    );

    useEffect(() => {
        if (statsStatus === "success") {
            setLoading(true);
            // getting chart data
            const {
                ticketSeverityDataSet,
                ticketStatusDataSet,
                ticketTypeDataSet,
            } = getChartData(stats);

            setChartDataSevertiy((prev) => {
                const dataset = prev.datasets[0];
                dataset.data = Object.values(ticketSeverityDataSet);
                return {
                    ...prev,
                    datasets: [dataset],
                };
            });
            setChartDataStatus((prev) => {
                const dataset = prev.datasets[0];
                dataset.data = Object.values(ticketStatusDataSet);
                return {
                    ...prev,
                    datasets: [dataset],
                };
            });
            setChartDataType((prev) => {
                const dataset = prev.datasets[0];
                dataset.data = Object.values(ticketTypeDataSet);
                return {
                    ...prev,
                    datasets: [dataset],
                };
            });
            setLoading(false);
        }
    }, [statsStatus]);

    return (
        <>
            <h1 className='table_name'>Statistics</h1>
            {loading ? (
                <div className='w-full flex justify-center items-center'>
                    <Spinner></Spinner>
                </div>
            ) : (
                <div className='grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                    <div className='statistic'>
                        <h3 className='stat_name'>Ticket Type</h3>
                        <Pie data={chartDataType}></Pie>
                    </div>
                    <div className='statistic'>
                        <h3 className='stat_name'>Ticket Status</h3>
                        <Pie data={chartDataStatus}></Pie>
                    </div>
                    <div className='statistic'>
                        <h3 className='stat_name'>Ticket Severity</h3>
                        <Pie data={chartDataSevertiy}></Pie>
                    </div>
                </div>
            )}
        </>
    );
};

function getChartData(stats: stat[]) {
    // Goes through an array and gathers up the status, type and severity
    type ticketData = {
        [key: string]: number;
    };
    const ticketStatusDataSet: ticketData = {
        Open: 0,
        Todo: 0,
        "In Progress": 0,
        "To Be Tested": 0,
        Closed: 0,
    };
    const ticketSeverityDataSet: ticketData = {
        Critical: 0,
        High: 0,
        Medium: 0,
        Low: 0,
        None: 0,
    };

    const ticketTypeDataSet: ticketData = {
        Bug: 0,
        Feature: 0,
        Error: 0,
        Issue: 0,
    };

    stats.map((stat: stat) => {
        if (ticketSeverityDataSet.hasOwnProperty(stat.ticketSeverity)) {
            ticketSeverityDataSet[stat.ticketSeverity] += 1;
        } else {
            ticketSeverityDataSet[stat.ticketSeverity] = 1;
        }

        if (ticketStatusDataSet.hasOwnProperty(stat.ticketStatus)) {
            ticketStatusDataSet[stat.ticketStatus] += 1;
        } else {
            ticketStatusDataSet[stat.ticketStatus] = 1;
        }

        if (ticketTypeDataSet.hasOwnProperty(stat.ticketType)) {
            ticketTypeDataSet[stat.ticketType] += 1;
        } else {
            ticketTypeDataSet[stat.ticketType] = 1;
        }
    });

    return { ticketStatusDataSet, ticketSeverityDataSet, ticketTypeDataSet };
}

export default Statistics;
