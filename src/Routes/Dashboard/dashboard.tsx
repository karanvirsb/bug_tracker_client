import React, { lazy, Suspense, useEffect } from "react";
import { useAppSelector } from "../../Hooks/hooks";
import Tab from "../../Components/Tab/Tab";
import socket from "../../API/sockets";
import Spinner from "../../Components/Spinner";
const DashboardTab = lazy(() => import("./Components/DashboardTab"));
const MembersTab = lazy(() => import("../../Components/MembersTab/MembersTab"));

const Dashboard = () => {
    const auth = useAppSelector((state) => state.auth);
    const group = useAppSelector((state) => state.persistedReducer.group);

    // getting the group Id
    const groupId = useAppSelector((state) => state.auth.group_id);

    const components = {
        dashboard: (
            <DashboardTab groupId={groupId || group.groupId}></DashboardTab>
        ),
        members: <MembersTab users={group.users}></MembersTab>,
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
    }, [auth?.group_id, auth.username]);

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
