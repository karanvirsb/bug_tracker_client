import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useComponentVisible from "../../Hooks/useComponentVisible";
import { IUser } from "../../Redux/Slices/userSlice";

type props = {
    user: IUser;
};

const Account = ({ user }: props) => {
    const [clicked, setClicked] = useState(false);
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible();

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

    return (
        <div className='m-md:ml-auto min-w-[50px]'>
            <div onClick={toggleMenu}>
                <img
                    className='w-[50px] h-[50px] cursor-pointer'
                    src={`data:${
                        user.avatar.contentType
                    };utf8,${encodeURIComponent(user.avatar.data)}`}
                    alt={user.firstName + " " + user.lastName}
                ></img>
                {isComponentVisible && (
                    <div
                        className='absolute translate-x-[-75%] translate-y-[-25%] bg-white flex flex-col gap-2 shadow-sm shadow-gray-500 rounded-md p-4 text-center'
                        ref={ref}
                    >
                        <Link
                            to=''
                            className='hover:bg-gray-200 w-full px-3 py-1 rounded-sm'
                        >
                            Account
                        </Link>
                        <Link
                            to=''
                            className='hover:bg-gray-200 w-full px-3 py-1 rounded-sm'
                        >
                            Setting
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Account;
