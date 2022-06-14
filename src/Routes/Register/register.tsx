import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <section className='bg-main-color w-full min-h-screen flex justify-center items-center px-3 '>
            <form
                action=''
                className='bg-white p-4 flex justify-between items-center flex-col gap-4 w-[25rem] sm:w-4/5 h-full rounded-md'
            >
                <h1 className='xl:text-4xl lg:text-3xl'>Register</h1>
                <div className='flex gap-4 sm:flex-col w-full'>
                    <input
                        type='text'
                        name='firstName'
                        id=''
                        className='input'
                        placeholder='First Name'
                    />
                    <input
                        type='text'
                        name='lastName'
                        className='input'
                        placeholder='Last Name'
                    />
                </div>
                <input
                    type='email'
                    name='email'
                    className='input'
                    placeholder='Email'
                />
                <input
                    type='text'
                    name='username'
                    className='input'
                    placeholder='Username'
                    autoComplete='false'
                />
                <input
                    type='password'
                    name='password'
                    className='input'
                    placeholder='Password'
                    autoComplete='false'
                />
                <input
                    type='password'
                    name='confirmPassword'
                    className='input'
                    placeholder='Confirm Password'
                    autoComplete='false'
                />
                <div className='flex flex-col justify-evenly w-full gap-4'>
                    <button className=' btn bg-secondary-color text-black  text-lg hover:outline-secondary-color transition-colors'>
                        Register
                    </button>
                    <Link
                        to='/login'
                        className='text-lg text-gray-700 w-max hover:text-black '
                    >
                        Already have an account?
                    </Link>
                </div>
            </form>
        </section>
    );
};

export default Register;
