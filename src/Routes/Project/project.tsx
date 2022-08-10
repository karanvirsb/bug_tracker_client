import React, { lazy, Suspense, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import socket from "../../API/sockets";
import { setProject } from "../../Redux/Slices/projectSlice";
import axiosPrivate from "../../Components/AxiosInterceptors";
const TicketsTab = lazy(() => import("./Components/TicketsTab"));
import Tab from "../../Components/Tab/Tab";
const MembersTab = lazy(() => import("../../Components/MembersTab/MembersTab"));

const Project = () => {
    const { projectId } = useParams();

    const auth = useAppSelector((state) => state.persistedReducer.auth);
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );

    const dispatch = useAppDispatch();

    // fetching a specific project
    const fetchProject = async () => {
        const resp = await axiosPrivate("/project/id", {
            method: "post",
            data: { filter: "projectId", filterValue: projectId },
        });
        return resp.data;
    };

    const { data: project, status: projectStatus } = useQuery(
        "ticketProject",
        fetchProject
    );

    const projectUsers = [];

    //TODO change groupUsers to a MAP
    for (const user of groupUsers) {
        if (project?.users?.includes(user.username)) {
            projectUsers.push(user);
        }
    }

    const components = {
        issues: (
            <TicketsTab
                project={project}
                projectStatus={projectStatus}
                projectId={projectId}
            ></TicketsTab>
        ),
        members: <MembersTab users={projectUsers}></MembersTab>,
    };

    const tabs = [
        {
            value: "issues",
            label: "Issues",
        },

        {
            value: "members",
            label: "Members",
        },
    ];

    useEffect(() => {
        socket.emit("joinRoom", { roomId: projectId, username: auth.username });

        socket.on("roomJoined", (join) => {
            console.log("project room joined: " + join);
        });

        return () => {
            socket.off("roomJoined");

            socket.emit("leaveRoom", {
                roomId: projectId,
                username: auth.username,
            });
        };
    }, []);

    useEffect(() => {
        if (projectStatus === "success") {
            dispatch(setProject(project));
        }
    }, [project, projectStatus]);

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

export default Project;
