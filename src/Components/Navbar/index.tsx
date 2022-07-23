import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import axiosPrivate from "../AxiosInterceptors";
import { useQuery } from "react-query";
import { setGroup } from "../../Redux/Slices/groupSlice";
import Spinner from "../Spinner";
import useIsAdmin from "../../Hooks/useIsAdmin";
import useComponentVisible from "../../Hooks/useComponentVisible";

export const Navbar = () => {
    const [showNavigation, setShowNavigation] = useState<boolean>(false);
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(false);
    const logout = useLogout();
    const dispatch = useAppDispatch();
    const { isAdmin } = useIsAdmin();

    const auth = useAppSelector((state) => state.persistedReducer.auth);
    const group = useAppSelector((state) => state.persistedReducer.group);
    const modal = useAppSelector((state) => state.modal.open);
    // fetching gruop info with invite code
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

    const openModal = () => {
        setShowNavigation(true);
    };

    const closeModal = () => {
        setShowNavigation(false);
    };

    const setArrowDegree = isComponentVisible ? "-rotate-90" : "rotate-90";

    const classNameFunc = ({ isActive }: any) =>
        isActive
            ? "bg-gray-400 text-black font-semibold rounded-md py-2 px-4"
            : "rounded-md py-2 px-4 hover:font-semibold hover:bg-gray-400 hover:text-black";

    useEffect(() => {
        if (groupStatus === "success") {
            dispatch(setGroup(groupData));
        }
    }, [groupStatus, groupData, dispatch]);

    return (
        <header
            className={`bg-main-color text-white fixed top-2 left-2 bottom-2 m-md:rounded-2xl p-4 min-h-[98.5vh] w-[175px] flex flex-col md:top-0 md:left-0 md:bottom-0${
                showNavigation
                    ? " md:w-[50vw] sm:w-full md:block md:-z-1"
                    : " md:bg-transparent md:text-black md:w-max"
            } ${modal && "md:hidden"}`}
        >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-8 w-8 md:${
                    showNavigation ? "hidden" : "block"
                } m-lg:hidden`}
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
            <nav
                className={`flex flex-col justify-between min-h-full ${
                    showNavigation ? "" : "md:hidden"
                }`}
            >
                <div className='pb-4 w-full'>
                    <div className='flex items-center md:px-4 w-full'>
                        <h1 className=' flex-1 text-center text-xl pb-1 m-md:w-full'>
                            {groupStatus !== "success" ? (
                                <Spinner></Spinner>
                            ) : (
                                <div className='relative w-full'>
                                    <button
                                        className='flex text-left items-center justify-center gap-4 w-full hover:outline hover:outline-gray-500 rounded-md'
                                        onClick={() =>
                                            setIsComponentVisible(
                                                (prev) => !prev
                                            )
                                        }
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
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className={`h-8 w-8 m-md:hidden cursor-pointer ${
                                showNavigation ? "inline-block" : "hidden"
                            }`}
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
                    </div>
                    <div className=' flex flex-col gap-4 py-4 m-md:text-center'>
                        <NavLink to='/dashboard' className={classNameFunc}>
                            Dashboard
                        </NavLink>
                        <NavLink className={classNameFunc} to='/tickets'>
                            Tickets
                        </NavLink>
                        {isAdmin && (
                            <NavLink
                                className={classNameFunc}
                                to='/administration'
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

type dropDownProps = {
    inviteCode: string;
    componentRef: typeof useRef;
};
const GroupDropDown = ({ inviteCode, componentRef }: dropDownProps) => {
    const [copied, setCopied] = useState(false);
    const copyInviteCode = () => {
        navigator.clipboard.writeText(inviteCode);
        setCopied(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => [setCopied(false)], 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [copied]);
    return (
        <div
            className='absolute bg-white text-black p-1 z-10 rounded-md w-full'
            ref={componentRef}
        >
            <p
                className='border-b border-b-gray-300 cursor-pointer relative'
                onClick={copyInviteCode}
            >
                {inviteCode}
                {copied && (
                    <span className='absolute top-[100%] right-[25%] bg-gray-600 text-white p-3 rounded-md'>
                        Copied
                    </span>
                )}
            </p>
            <button className='btn bg-secondary-color text-white w-full hover:text-black hover:outline hover:outline-2 hover:outline-black mt-2'>
                Leave Group
            </button>
        </div>
    );
};
