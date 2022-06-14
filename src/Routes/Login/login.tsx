import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type States = {
    login: {
        username: string;
        password: string;
    };
};

const Login = (): JSX.Element => {
    const navigate = useNavigate();

    const [inputValues, setInputValues] = useState<States["login"]>({
        username: "",
        password: "",
    });

    const changedValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!inputValues.username) throw Error("Invalid username");
        if (!inputValues.password) throw Error("Invalid password");

        // TODO submit the login data
    };

    return (
        <section className='bg-main-color w-full min-h-screen flex justify-center items-center px-3 '>
            <form
                className='bg-white p-4 flex justify-between items-center flex-col gap-4 w-80 sm:w-4/5 h-60 lg:h-80 xl:h-[20rem] rounded-md'
                onSubmit={handleSubmit}
            >
                <h1 className=' xl:text-4xl lg:text-3xl'>Login</h1>
                <div className='h-full flex flex-col justify-evenly w-full'>
                    <input
                        className='input'
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={inputValues.username}
                        onChange={changedValue}
                    />
                    <input
                        className='input'
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={inputValues.password}
                        onChange={changedValue}
                    />
                </div>
                <div className='flex flex-col justify-evenly w-full gap-4'>
                    <button className='btn bg-secondary-color text-black text-lg hover:outline-secondary-color transition-colors'>
                        Login
                    </button>
                    <button
                        className='btn bg-gray-300 text-gray-900 text-lg  hover:outline-gray-300 transition-colors'
                        onClick={() => {
                            navigate("/register");
                        }}
                    >
                        Register
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Login;
