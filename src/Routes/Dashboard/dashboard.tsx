import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";

import { useQuery } from "react-query";
import Spinner from "../../Components/Spinner";
import axiosPrivate from "../../Components/AxiosInterceptors";
import { setUsers } from "../../Redux/Slices/groupSlice";

import DashboardTab from "./Components/DashboardTab";
import Tab from "../../Components/Tab/Tab";

const Dashboard = () => {
    const dispatch = useAppDispatch();

    // getting the group Id
    const groupId = useAppSelector(
        (state) => state.persistedReducer.auth.group_id
    );

    // fetching all the users of the group
    const fetchGroupUsers = async () => {
        const resp = await axiosPrivate("/user/group", {
            method: "Post",
            data: { groupId: groupId },
        });
        return resp.data;
    };

    const { data: usersData, status: groupUsersStatus } = useQuery(
        "groupUsers",
        fetchGroupUsers
    );

    const components = {
        dashboard: <DashboardTab groupId={groupId}></DashboardTab>,
        members: <div>Members</div>,
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

    useEffect(() => {
        const newUsers = usersData?.map((user: any) => {
            const isAdmin = Object.values(user.roles).includes("1990");
            const isEditor = Object.values(user.roles).includes("1991");

            return {
                avatar: user.avatar,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                isAdmin,
                isEditor,
            };
        });
        console.log(newUsers);
        if (groupUsersStatus === "success") {
            dispatch(setUsers(newUsers));
        }
    }, [groupUsersStatus, usersData, dispatch]);
    return (
        <section className='sections'>
            <Tab tabs={tabs} components={components}></Tab>
        </section>
    );
};

export default Dashboard;
