import React from "react";
import { useAppSelector } from "../../Hooks/hooks";

import DashboardTab from "./Components/DashboardTab";
import Tab from "../../Components/Tab/Tab";
import MembersTab from "../../Components/MembersTab/MembersTab";

const Dashboard = () => {
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );
    // getting the group Id
    const groupId = useAppSelector(
        (state) => state.persistedReducer.auth.group_id
    );

    const components = {
        dashboard: <DashboardTab groupId={groupId}></DashboardTab>,
        members: <MembersTab users={groupUsers}></MembersTab>,
    };

    const tabs = [
        {
            value: "dashboard",
            label: "Dashboard",
        },
        {
            value: "members",
            label: "Members",
        },
    ];

    return (
        <section className='sections'>
            <Tab tabs={tabs} components={components}></Tab>
        </section>
    );
};

export default Dashboard;
