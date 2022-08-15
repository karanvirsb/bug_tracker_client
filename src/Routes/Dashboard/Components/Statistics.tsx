import React, { useEffect, useState } from "react";
import { Chart as ChartJs } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useQuery } from "react-query";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import { useAppSelector } from "../../../Hooks/hooks";
import Spinner from "../../../Components/Spinner";

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

const Statistics = () => {
    const [chartDataStatus, setChartDataStatus] = useState<chartDataType>({
        labels: ["Open", "Todo", "In Progress", "To Be Tested", "Closed"],
        datasets: [
            {
                label: "# of status`",
                data: [],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    });
    const [chartDataType, setChartDataType] = useState<chartDataType>({
        labels: ["Bug", "Feature", "Error", "Issue"],
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
            },
        ],
    });
    const [chartDataSevertiy, setChartDataSevertiy] = useState<chartDataType>({
        labels: ["Critical", "High", "Medium", "Low", "None"],
        datasets: [
            {
                label: "# of severitys",
                data: [],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    });
    const groupInfo = useAppSelector((state) => state.persistedReducer.group);

    // fetching project ids based on group id
    const fetchProjectIds = async () => {
        const resp = await axiosPrivate(
            `/project/group/projectIds/${groupInfo.groupId}`,
            { method: "GET" }
        );
        return resp.data;
    };

    // fetching statistics
    const fetchStatistics = async (projectIds: string[]) => {
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
        console.log(stats);
        const ticketStatusDataSet: { [key: string]: number } = {};
        const ticketSeverityDataSet: { [key: string]: number } = {};
        const ticketTypeDataSet: { [key: string]: number } = {};
        if (statsStatus === "success") {
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
        }
    }, [statsStatus]);

    return (
        <>
            <h1>Statistics</h1>
            {statsStatus === "loading" && (
                <div className='w-full flex justify-center items-center'>
                    <Spinner></Spinner>
                </div>
            )}
            {statsStatus === "success" && (
                <div className='flex gap-4'>
                    <div>
                        <h3>Ticket Type</h3>
                    </div>
                    <div>
                        <h3>Ticket Status</h3>
                    </div>
                    <div>
                        <h3>Ticket Severity</h3>
                    </div>
                </div>
            )}
        </>
    );
};

export default Statistics;
