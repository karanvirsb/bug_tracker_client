import React, { lazy, Suspense, useEffect } from "react";
import { useAppSelector } from "../../Hooks/hooks";
const DashboardTab = lazy(() => import("./Components/DashboardTab"));
const MembersTab = lazy(() => import("../../Components/MembersTab/MembersTab"));
import Tab from "../../Components/Tab/Tab";
import socket from "../../API/sockets";
import Spinner from "../../Components/Spinner";

const Dashboard = () => {
    const auth = useAppSelector((state) => state.auth);
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );
    // getting the group Id
    const groupId = useAppSelector((state) => state.auth.group_id);

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

    useEffect(() => {
        socket.emit("joinRoom", {
            roomId: auth?.group_id,
            username: auth.username,
        });

        socket.on("roomJoined", (join) => {
            console.log("room join: " + join);
        });

        return () => {
            socket.off("roomJoined");
        };
    }, []);

    return (
        <section className='sections'>
            <Suspense
                fallback={
                    <div className='fixed inset-0 flex justify-center items-center'>
                        <div className='bg-white w-20 h-20 rounded-lg flex justify-center items-center'>
                            <Spinner></Spinner>
                        </div>
                    </div>
                }
            >
                <Tab tabs={tabs} components={components}></Tab>
            </Suspense>
        </section>
    );
};

export default Dashboard;
