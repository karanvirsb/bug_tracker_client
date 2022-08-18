import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import axiosPrivate from "../AxiosInterceptors";
import { useQuery } from "react-query";
import { setGroup, setUsers } from "../../Redux/Slices/groupSlice";
import Spinner from "../Spinner";
import useIsAdmin from "../../Hooks/useIsAdmin";
import useComponentVisible from "../../Hooks/useComponentVisible";
import GroupDropDown from "./GroupDropDown";

const Navbar = () => {
    const [showNavigation, setShowNavigation] = useState<boolean>(false);
    const [clicked, setClicked] = useState(false);
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible();
    const logout = useLogout();
    const dispatch = useAppDispatch();
    const { isAdmin } = useIsAdmin();

    const auth = useAppSelector((state) => state.persistedReducer.auth);
    const group = useAppSelector((state) => state.persistedReducer.group);
    const modal = useAppSelector((state) => state.modal.open);

    // fetching group information with groupId
    const fetchGroup = async () => {
        const resp = await axiosPrivate("/group/id", {
            method: "post",
            data: { filter: "groupId", filterValue: auth?.group_id },
        });

        return resp.data;
    };

    const { data: groupData, status: groupStatus } = useQuery(
        "groupInfo",
        fetchGroup
    );

    // fetching all the users of the group
    const fetchGroupUsers = async () => {
        const resp = await axiosPrivate("/user/group", {
            method: "Post",
            data: { groupId: group.groupId },
        });
        return resp.data;
    };

    const { data: usersData, status: groupUsersStatus } = useQuery(
        "groupUsers",
        fetchGroupUsers,
        {
            enabled: !!group.groupId,
        }
    );

    const openModal = () => {
        setShowNavigation(true);
    };

    const closeModal = () => {
        setShowNavigation(false);
    };

    const setArrowDegree = isComponentVisible ? "-rotate-90" : "rotate-90";

    // to check if the nav item is active or not to highlight the page the user is on
    const classNameFunc = ({ isActive }: any) => {
        return isActive
            ? "bg-gray-400 text-black font-semibold rounded-md py-2 px-4"
            : "rounded-md py-2 px-4 hover:font-semibold hover:bg-gray-400 hover:text-black";
    };

    const toggleMenu = () => {
        if (!clicked) {
            setClicked(true);
            setIsComponentVisible(true);
        } else {
            setClicked(false);
        }
    };

    useEffect(() => {
        if (!isComponentVisible) {
            setClicked(false);
        }
    }, [isComponentVisible]);

    useEffect(() => {
        if (groupStatus === "success") {
            dispatch(setGroup(groupData));
        }
    }, [groupStatus, groupData, dispatch]);

    useEffect(() => {
        // updating the user data to match the groupUsersSlice
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

        if (groupUsersStatus === "success") {
            dispatch(setUsers(newUsers));
        }
    }, [groupUsersStatus, usersData, dispatch]);

    return (
        <header
            className={`bg-main-color text-white fixed top-2 left-2 bottom-2 m-md:rounded-2xl p-4 min-h-[98.5vh] w-[175px] flex flex-col md:top-0 md:left-0 md:bottom-0${
                showNavigation
                    ? " md:w-[50vw] sm:w-full md:block md:-z-1"
                    : " md:bg-transparent md:text-black md:w-max"
            }`}
            // ${modal && "md:hidden"}
        >
            <div className='m-md:hidden fixed bottom-2 right-2 bg-white outline outline-1 outline-gray-200 shadow-xl rounded-full p-4'>
                {showNavigation ? (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className={`h-8 w-8 text-black`}
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                        onClick={closeModal}
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6 18L18 6M6 6l12 12'
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className={`h-8 w-8`}
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                        onClick={openModal}
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M4 6h16M4 12h16M4 18h16'
                        />
                    </svg>
                )}
            </div>
            <nav
                className={`flex flex-col justify-between min-h-full ${
                    showNavigation ? "" : "md:hidden"
                }`}
            >
                <div className='pb-4 w-full'>
                    <div
                        className='flex items-center md:px-4 w-full'
                        onClick={toggleMenu}
                    >
                        <h1 className=' flex-1 text-center text-xl pb-1 m-md:w-full'>
                            {groupStatus !== "success" ? (
                                <div className='flex justify-center items-center'>
                                    <Spinner></Spinner>
                                </div>
                            ) : (
                                <div className='relative w-full'>
                                    <button
                                        id='groupNameBtn'
                                        className='flex text-left items-center justify-center gap-4 w-full hover:outline hover:outline-gray-500 rounded-md'
                                    >
                                        {groupData.groupName}
                                        <div
                                            className={`${setArrowDegree} text-2xl flex justify-center items-center w-max h-max`}
                                        >
                                            &#10095;
                                        </div>
                                    </button>
                                    {isComponentVisible && (
                                        <GroupDropDown
                                            inviteCode={group.groupInviteCode}
                                            componentRef={ref}
                                        ></GroupDropDown>
                                    )}
                                </div>
                            )}
                        </h1>
                    </div>
                    <div className=' flex flex-col gap-4 py-4 m-md:text-center'>
                        <NavLink
                            to='/dashboard'
                            className={classNameFunc}
                            onClick={closeModal}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            className={classNameFunc}
                            to='/tickets'
                            onClick={closeModal}
                        >
                            Tickets
                        </NavLink>
                        {isAdmin && (
                            <NavLink
                                className={classNameFunc}
                                to='/admin'
                                onClick={closeModal}
                            >
                                Administration
                            </NavLink>
                        )}
                    </div>
                </div>
                <button
                    className='bg-secondary-color text-black py-2 px-4 rounded-md hover:bg-transparent hover:text-white hover:font-semibold hover:outline hover:outline-secondary-color hover:outline-2'
                    onClick={logout}
                >
                    Logout
                </button>
            </nav>
        </header>
    );
};

export default Navbar;
