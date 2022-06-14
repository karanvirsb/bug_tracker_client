import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type States = {
    username: string;
    password: string;
};

const Login = (): JSX.Element => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<States["username"]>("");
    const [password, setPassword] = useState<States["password"]>("");

    return (
        <section className='bg-main-color w-full min-h-screen flex justify-center items-center px-3 '>
            <div className='bg-white p-4 flex justify-between items-center flex-col gap-4 w-80 sm:w-4/5 h-60 lg:h-80 xl:h-[20rem] rounded-md'>
                <h1 className=' xl:text-4xl lg:text-3xl'>Login</h1>
                <div className='h-full flex flex-col justify-evenly w-full'>
                    <input
                        className='border-b-[2px] border-gray-400 w-full py-1 px-3 hover:outline-none focus:outline-none focus:border-secondary-color focus:border-b-[3px] xl:text-2xl lg:text-xl placeholder:text-xl'
                        type='text'
                        name='username'
                        placeholder='Username'
                    />
                    <input
                        className='border-b-[2px] border-gray-400 w-full py-1 px-3 hover:outline-none focus:outline-none focus:border-secondary-color focus:border-b-[3px]  xl:text-2xl lg:text-xl placeholder:text-xl'
                        type='text'
                        name='password'
                        placeholder='Password'
                    />
                </div>
                <div className='flex flex-col justify-evenly w-full gap-4'>
                    <button className='bg-secondary-color text-black btn hover:outline-secondary-color transition-colors'>
                        Login
                    </button>
                    <button
                        className='bg-gray-300 text-gray-900 btn hover:outline-gray-300 transition-colors'
                        onClick={() => {
                            navigate("/register");
                        }}
                    >
                        Register
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Login;
