import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();
    return (
        <section className='bg-main-color flex justify-center items-center w-full h-screen'>
            <div className='bg-white p-4 rounded-md flex flex-col gap-3'>
                <h1 className='md:text-xl xl:text-3xl text-center'>
                    Unauthorized
                </h1>
                <p className='md:text-lg xl:text-xl text-center'>
                    You do not have the correct authorization to access this
                    page.
                </p>
                <button
                    className='bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:text-black rounded-md mt-8 py-2 px-4 md:text-lg xl:text-xl text-center'
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </button>
            </div>
        </section>
    );
};

export default Unauthorized;
