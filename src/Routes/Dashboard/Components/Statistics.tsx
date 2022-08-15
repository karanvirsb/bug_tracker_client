import React, { useEffect } from "react";
import { Chart as ChartJs } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useQuery } from "react-query";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import { useAppSelector } from "../../../Hooks/hooks";

const Statistics = () => {
    const groupInfo = useAppSelector((state) => state.persistedReducer.group);

    // fetching project ids based on group id
    const fetchProjectIds = async () => {
        const resp = await axiosPrivate(
            `/project/group/projectIds/${groupInfo.groupId}`,
            { method: "GET" }
        );
        return resp.data;
    };

    const { data: projectIds } = useQuery("groupProjectIds", fetchProjectIds);

    // fetching statistics
    const fetchStatistics = async (projectIds: string[]) => {
        const resp = await axiosPrivate("/ticket/stats", {
            method: "POST",
            data: { projectIds },
        });
        return resp.data;
    };

    // querying statistics that are dependent on the projectIds
    const { data: stats, status: statsStatus } = useQuery(
        "statistics",
        () => fetchStatistics(projectIds),
        {
            enabled: !projectIds,
        }
    );

    useEffect(() => {
        if (statsStatus === "success") {
            console.log(stats);
        }
    }, [statsStatus]);
    return (
        <>
            <h1>Statistics</h1>
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
        </>
    );
};

export default Statistics;
