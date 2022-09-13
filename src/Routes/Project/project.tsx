import React, { lazy, Suspense, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import socket from "../../API/sockets";
import { setProject } from "../../Redux/Slices/projectSlice";
import axiosPrivate from "../../Components/AxiosInterceptors";
import Tab from "../../Components/Tab/Tab";
const TicketsTab = lazy(() => import("./Components/TicketsTab"));
const MembersTab = lazy(() => import("../../Components/MembersTab/MembersTab"));

const Project = () => {
    const { projectId } = useParams();
    const [searchParams] = useSearchParams();
    const auth = useAppSelector((state) => state.auth);
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
                projectUsers={projectUsers}
                findTicketId={searchParams.get("ticketId") ?? ""}
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
    }, [auth.username, projectId]);

    useEffect(() => {
        if (projectStatus === "success") {
            dispatch(setProject(project));
        }
    }, [dispatch, project, projectStatus]);

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
