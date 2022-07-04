import React from "react";
import { useNavigate } from "react-router-dom";
const RegistrationSuccessful = () => {
    const navigate = useNavigate();
    return (
        <section className='bg-main-color flex justify-center items-center p-4 w-full h-screen success-background'>
            <div className='bg-white p-4 rounded-md flex flex-col gap-3'>
                <h1 className='md:text-2xl xl:text-3xl text-center'>
                    Registration Was Successful
                </h1>
                <p className='md:text-lg xl:text-xl text-center'>
                    Please continue back to the login page.
                </p>
                <button
                    className='bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:text-black rounded-md mt-8 py-2 px-4 md:text-lg xl:text-xl text-center '
                    onClick={() => {
                        navigate("/login", { replace: true });
                    }}
                >
                    Login
                </button>
            </div>
        </section>
    );
};

export default RegistrationSuccessful;
