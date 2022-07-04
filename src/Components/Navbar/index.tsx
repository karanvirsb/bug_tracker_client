import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className='bg-main-color text-white fixed top-2 left-2 bottom-2 rounded-2xl p-4 min-h-[98.5vh] w-[175px] flex flex-col justify-between'>
            <div className='pb-4 '>
                {/* TODO make drop down */}
                <h1 className='text-center border-b-2 text-xl pb-1'>
                    Group name
                </h1>
                <div className=' flex flex-col gap-4 py-4 px-4 text-center'>
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
                </div>
            </div>
            <button className='bg-secondary-color text-black py-2 px-4 rounded-md hover:bg-transparent hover:text-white hover:font-semibold hover:outline hover:outline-secondary-color hover:outline-2'>
                Logout
            </button>
        </nav>
    );
};

export const AdminNavbar = () => {
    return (
        <nav className='bg-main-color text-white fixed top-2 left-2 bottom-2 rounded-2xl p-4 w-[175px] flex flex-col justify-between'>
            <div className='pb-4 '>
                {/* TODO make drop down */}
                <h1 className='text-center border-b-2 text-xl pb-1'>
                    Group name
                </h1>
                <div className=' flex flex-col gap-4 py-4 px-4 text-center'>
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
                    <Link
                        className='rounded-md py-2 px-4 hover:font-semibold hover:bg-gray-400 hover:text-black'
                        to='/administration'
                    >
                        Administration
                    </Link>
                </div>
            </div>
            <button className='bg-secondary-color text-black py-2 px-4 rounded-md hover:bg-transparent hover:text-white hover:font-semibold hover:outline hover:outline-secondary-color hover:outline-2'>
                Logout
            </button>
        </nav>
    );
};
