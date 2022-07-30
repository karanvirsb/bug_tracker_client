import React, { useEffect, useMemo, useState } from "react";
import Members from "./Components/Members";
import { useAppSelector } from "../../Hooks/hooks";
import { useMutation } from "react-query";
import axiosPrivate from "../../Components/AxiosInterceptors";
import { toast } from "react-toastify";
import socket from "../../API/sockets";
import { AxiosError } from "axios";
import Spinner from "../../Components/Spinner";
import Pagination from "../../Components/Pagination";
import Tab from "../../Components/Tab/Tab";

type mutationTypes = {
    groupNameMutationType: {
        id: string;
        groupName: string;
    };
    refreshMutation: {
        id: string;
        groupName: string;
    };
};

const Administration = () => {
    const totalPerPage = 5;
    const group = useAppSelector((state) => state.persistedReducer.group);
    const [pageNumber, setPageNumber] = useState(1);
    const [usersPageSetting, setUsersPageSetting] = useState({
        start: 0,
        end: totalPerPage,
    });
    const [groupName, setGroupName] = useState(group.groupName);
    const [disableBtn, setDisableBtn] = useState(true);
    const totalPage = useMemo(
        () => Math.floor(group.users.length / totalPerPage),
        [group.users]
    );
    const hasMore = useMemo(() => {
        return pageNumber === totalPage;
    }, [pageNumber, totalPage]);
    const groupUsers = useMemo(() => {
        return group.users.slice(usersPageSetting.start, usersPageSetting.end);
    }, [usersPageSetting]);

    const groupNameMutation = useMutation(
        async ({ id, groupName }: mutationTypes["groupNameMutationType"]) => {
            const resp = await axiosPrivate("/group/rename", {
                method: "put",
                data: { id: id, groupName: groupName },
            });

            return resp.data;
        }
    );

    const refreshMutation = useMutation(
        async ({ id, groupName }: mutationTypes["refreshMutation"]) => {
            const resp = await axiosPrivate("/group/refresh", {
                method: "put",
                data: { id: id, groupName: groupName },
            });

            return resp.data;
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== group.groupName) {
            setDisableBtn(false);
        } else {
            setDisableBtn(true);
        }
        setGroupName(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (groupName.length < 4 || groupName.length > 50) {
            toast.error("Group Name should be between 4 and 50 characters");
            setGroupName(group.groupName);
            setDisableBtn(true);
            return;
        }

        groupNameMutation.mutateAsync(
            { id: group.groupId, groupName: groupName },
            {
                onSuccess: () => {
                    toast.success("Name has successfully been changed");
                    socket.emit("invalidateQuery", {
                        queryName: "groupInfo",
                        groupId: group.groupId,
                    });
                },
                onError: (error: any) => {
                    if (error instanceof AxiosError) {
                        if (error?.response?.status === 500) {
                            toast.error(error?.response?.data?.message);
                            setGroupName(group.groupName);
                            setDisableBtn(true);
                        } else {
                            const errorResp = JSON.parse(
                                error.response?.data.message
                            );
                            errorResp.forEach(
                                (elem: {
                                    code: string;
                                    inclusive: boolean;
                                    message: string;
                                    minimum?: number;
                                    maxiumum?: number;
                                    path: string[];
                                    type: string;
                                }) => {
                                    toast.error(
                                        elem.path[0] + " " + elem.message
                                    );
                                }
                            );
                        }
                    }
                },
            }
        );
    };

    const refreshInviteCode = () => {
        refreshMutation.mutateAsync(
            { id: group.groupId, groupName: groupName },
            {
                onSuccess: () => {
                    toast.success("Refreshed Invite Code");
                    socket.emit("invalidateQuery", {
                        queryName: "groupInfo",
                        groupId: group.groupId,
                    });
                },
                onError: (error) => {
                    if (error instanceof AxiosError) {
                        const errorResp = JSON.parse(
                            error.response?.data.message
                        );
                        errorResp.forEach(
                            (elem: {
                                code: string;
                                inclusive: boolean;
                                message: string;
                                minimum?: number;
                                maxiumum?: number;
                                path: string[];
                                type: string;
                            }) => {
                                toast.error(elem.path[0] + " " + elem.message);
                            }
                        );
                    }
                },
            }
        );
    };

    useEffect(() => {
        setUsersPageSetting((prev) => {
            return {
                ...prev,
                start: (pageNumber - 1) * totalPerPage,
                end: pageNumber * totalPerPage,
            };
        });
    }, [pageNumber]);

    return (
        <section className="sections p-4">
            <Tab tabs={[]} components={{}}></Tab>
            <div className="mb-4">
                <h1 className="text-2xl font-semibold mb-4">Group</h1>
                <form
                    action=""
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    <div className="input-container">
                        <label htmlFor="groupName" className="input-label">
                            Group Name
                        </label>
                        <input
                            type="text"
                            name="groupName"
                            id="groupName"
                            className="modal-input mx-4"
                            value={groupName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 w-1/3 min-w-max gap-4 md:grid-cols-1">
                        <button
                            type="submit"
                            className="btn bg-blue-400 font-semibold hover:outline-2 hover:outline-blue-400 disabled:bg-zinc-400 disabled:hover:outline-none"
                            disabled={disableBtn}
                        >
                            {groupNameMutation.isLoading ? (
                                <Spinner></Spinner>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                        <button
                            type="button"
                            className="btn bg-green-400 font-semibold hover:outline-2 hover:outline-green-400"
                            onClick={refreshInviteCode}
                        >
                            {refreshMutation.isLoading ? (
                                <Spinner></Spinner>
                            ) : (
                                "Refresh Invite Code"
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <h1 className="text-xl font-semibold mb-4">Members</h1>
                <div className="outline-[#D4D4D4] outline-1 outline p-4 text-left rounded-md mx-4">
                    <table className="w-full">
                        <thead className="text-sm text-gray-500 font-normal">
                            <tr>
                                <th scope="col" className="px-6 py-3 sm:hidden">
                                    {/* Avatar */}
                                </th>
                                <th scope="col" className="px-6 py-3 md:hidden">
                                    USERNAME
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 sm:text-center"
                                >
                                    FULL NAME
                                </th>
                                <th scope="col" className="px-6 py-3 md:hidden">
                                    EMAIL
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <Members users={groupUsers}></Members>
                        </tbody>
                    </table>
                    <Pagination
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        totalPage={totalPage}
                        hasMore={hasMore}
                    ></Pagination>
                </div>
            </div>
        </section>
    );
};

export default Administration;
