import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { axiosPrivate } from "../../API/axios";
import { AxiosError } from "axios";

type States = {
    groupType: string;
};

const AddGroup = () => {
    const [group, setGroup] = useState<States["groupType"]>("");
    const inviteCodeRegex = /.+#\d{4}/;

    const { mutateAsync } = useMutation((info) => {
        return axiosPrivate("/user/id", { method: "put", data: info });
    });

    const fetchGroups = async () => {
        const res = await axiosPrivate("/group/id", {
            method: "Post",
            data: { filter: "groupInviteCode", filterValue: group },
        });
        return res.data;
    };

    const joinGroup = async (): Promise<void> => {
        if (!group.match(inviteCodeRegex)) {
            toast.error(
                "Invalid invite must match: << [any character]#[4 digits] >> "
            );
        }
        try {
            // find group based on invite code
            const groupInfo = await fetchGroups();
            // if group doesnt exist show error
            if (!groupInfo) {
                toast.error(`${group} does not exist`);
                return;
            }
            // if group exists add group id to user

            // once gorup is added, add user to room based on group invite code
            // redirect user to the home page of the group
        } catch (error: any) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.error || "Server Error");
            }
        }
    };
    const createGroup = (): void => {
        if (group.includes("#")) {
            toast.error("Group name cannot contain: #");
        }
    };

    return (
        <section className='bg-main-color flex justify-center items-center p-4 w-full h-screen'>
            <div className='bg-white p-4 rounded-md flex flex-col gap-3'>
                <h1 className='md:text-2xl xl:text-3xl text-center'>
                    Join or Create a Group
                </h1>
                <input
                    type='text'
                    className='input'
                    placeholder='Invite / Group name'
                    onChange={(e) => setGroup(e.target.value)}
                    value={group}
                />
                <button
                    className='bg-blue-500 text-white font-semibold hover:outline-blue-500 hover:text-black hover:outline-2 hover:outline hover:bg-transparent rounded-md mt-2 py-2 px-4 md:text-lg xl:text-xl text-center'
                    onClick={joinGroup}
                >
                    Join
                </button>
                <button
                    className='bg-secondary-color text-white font-semibold hover:outline-secondary-color hover:outline-2 hover:outline hover:bg-transparent hover:text-black rounded-md py-2 px-4 md:text-lg xl:text-xl text-center'
                    onClick={createGroup}
                >
                    Create
                </button>
            </div>
        </section>
    );
};

export default AddGroup;
