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

const Statistics = () => {
    const [chartDataStatus, setChartDataStatus] = useState<chartDataType>({
        labels: ["Open", "Todo", "In Progress", "To Be Tested", "Closed"],
        datasets: [
            {
                label: "# of status`",
                data: [],
                backgroundColor: [],
                borderColor: [],
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
                backgroundColor: [],
                borderColor: [],
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
                backgroundColor: [],
                borderColor: [],
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

    return (
        <>
            <h1>Statistics</h1>
            {statsStatus === "loading" && <Spinner></Spinner>}
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
