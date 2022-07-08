import { useState } from "react";
import { Link } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";
import { useAppSelector } from "../../Hooks/hooks";

export const Navbar = () => {
    const [showNavigation, setShowNavigation] = useState<boolean>(false);
    const logout = useLogout();

    const auth = useAppSelector((state) => state.auth);
    const getRoles = () => {
        const roles = auth.roles;
        const role: string = "1990";
        return roles?.includes(role);
    };

    const openModal = () => {
        setShowNavigation(true);
    };

    const closeModal = () => {
        setShowNavigation(false);
    };

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
                            Group name
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
