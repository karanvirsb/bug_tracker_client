import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
// import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import axiosPrivate from "../AxiosInterceptors";
import { useQuery } from "react-query";
import { setGroup } from "../../Redux/Slices/groupSlice";
import Spinner from "../Spinner";
import useIsAdmin from "../../Hooks/useIsAdmin";

export const Navbar = () => {
    const [showNavigation, setShowNavigation] = useState<boolean>(false);
    const logout = useLogout();
    const dispatch = useAppDispatch();
    const { getRoles } = useIsAdmin();
    // const axiosPrivate = useAxiosPrivate();
    const auth = useAppSelector((state) => state.persistedReducer.auth);

    // fetching gruop info with invite code
    const fetchGroup = async () => {
        const resp = await axiosPrivate("/group/id", {
            method: "post",
            data: { filter: "groupId", filterValue: auth?.group_id },
        });
        console.log(resp);
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

    useEffect(() => {
        if (groupStatus === "success") {
            dispatch(setGroup(groupData));
        }
    }, [groupStatus, groupData, dispatch]);

    return (
        <header
            className={`bg-main-color text-white fixed top-2 left-2 bottom-2 m-md:rounded-2xl p-4 min-h-[98.5vh] w-[175px] flex flex-col sm:w-full md:top-0 md:left-0 md:bottom-0${
                showNavigation
                    ? " md:w-[50vw] md:block"
                    : " md:bg-transparent md:text-black md:w-max"
            }`}
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
                <div className='pb-4'>
                    {/* TODO make drop down */}
                    <div className='flex justify-between items-center md:px-4'>
                        <h1 className='text-center text-xl pb-1 m-md:w-full'>
                            {groupStatus !== "success" ? (
                                <Spinner></Spinner>
                            ) : (
                                groupData.groupName
                            )}
                        </h1>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className={`h-8 w-8 m-md:hidden ${
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
                        <Link
                            className='rounded-md py-2 px-4 hover:font-semibold hover:bg-gray-400 hover:text-black'
                            to='/dashboard'
                        >
                            Dashboard
                        </Link>
                        <Link
                            className='rounded-md py-2 px-4 hover:font-semibold hover:bg-gray-400 hover:text-black'
                            to='/tickets'
                        >
                            Tickets
                        </Link>
                        {getRoles() && (
                            <Link
                                className='rounded-md py-2 px-4 hover:font-semibold hover:bg-gray-400 hover:text-black'
                                to='/administration'
                            >
                                Administration
                            </Link>
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
