import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import ToolTip from "../../Components/Tooltip";
import axios from "../../API/axios";
import { toast } from "react-toastify";

type States = {
    register: {
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        password: string;
        confirmPassword: string;
    };
    isUserNameValid: boolean;
    isPasswordValid: boolean;
    isConfirmPasswordValid: boolean;
};

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;

const Register = () => {
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState<States["register"]>({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [isUsernameValid, setIsUsernameValid] =
        useState<States["isUserNameValid"]>(false);
    const [isPasswordValid, setIsPasswordValid] =
        useState<States["isPasswordValid"]>(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] =
        useState<States["isConfirmPasswordValid"]>(false);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValues((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        if (!isUsernameValid) {
            toast.error("Username is not valid");
        } else if (!isPasswordValid) {
            toast.error("Password is not valid");
        } else if (!isConfirmPasswordValid) {
            toast.error("Confirm Password is not valid");
        } else {
            toast.error("There is an issue");
        }

        try {
            const response = await axios.post("/register", {
                username: inputValues.username,
                password: inputValues.password,
                firstName: inputValues.firstName,
                lastName: inputValues.lastName,
                email: inputValues.email,
            });
            if (response.status === 201) {
                navigate("/registration-successful");
            }
        } catch (err: any) {
            if (err.response.status === 409) {
                toast.error(`${inputValues.username} already exists`);
            } else {
                toast.error("Server Error");
            }
        }
    };

    useEffect(() => {
        setIsUsernameValid(USER_REGEX.test(inputValues.username));
    }, [inputValues.username]);

    useEffect(() => {
        setIsPasswordValid(PWD_REGEX.test(inputValues.password));
    }, [inputValues.password]);

    useEffect(() => {
        setIsConfirmPasswordValid(
            inputValues.confirmPassword === inputValues.password
        );
    }, [inputValues.confirmPassword, inputValues.password]);

    return (
        <section className='bg-main-color w-full min-h-screen flex justify-center items-center px-3 '>
            <form
                action='Post'
                className='bg-white p-4 flex justify-between items-center flex-col gap-4 w-[25rem] sm:w-4/5 h-full rounded-md'
                onSubmit={handleSubmit}
            >
                <h1 className='xl:text-4xl lg:text-3xl'>Register</h1>
                <div className='flex gap-4 sm:flex-col w-full'>
                    <input
                        type='text'
                        name='firstName'
                        id=''
                        className='input'
                        placeholder='First Name'
                        value={inputValues.firstName}
                        onChange={changeHandler}
                        required
                    />
                    <input
                        type='text'
                        name='lastName'
                        className='input'
                        placeholder='Last Name'
                        value={inputValues.lastName}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <input
                    type='email'
                    name='email'
                    className='input'
                    placeholder='Email'
                    value={inputValues.email}
                    onChange={changeHandler}
                    required
                />

                {inputValues.username && !isUsernameValid && (
                    <ToolTip
                        id='username'
                        toolTipText='Username must be 4 to 24 characters long'
                    ></ToolTip>
                )}
                <div className='flex items-center gap-3 w-full'>
                    <input
                        type='text'
                        name='username'
                        className='input'
                        placeholder='Username'
                        id='username'
                        autoComplete='false'
                        value={inputValues.username}
                        onChange={changeHandler}
                        required
                    />
                    {inputValues.username &&
                        (isUsernameValid ? (
                            <AiOutlineCheck className='fill-green-400 text-[2rem] self-end'></AiOutlineCheck>
                        ) : (
                            <AiOutlineClose className='fill-red-400 text-[2rem] self-end'></AiOutlineClose>
                        ))}
                </div>
                {inputValues.password && !isPasswordValid && (
                    <ToolTip
                        id='password'
                        toolTipText='Password must have atleast 1 capital letter. Atleast 1 of these symbols "!@#$%_". Must be 8 to 24 characters long'
                    ></ToolTip>
                )}
                <div className='flex items-center gap-3 w-full'>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        className='input'
                        placeholder='Password'
                        autoComplete='false'
                        value={inputValues.password}
                        onChange={changeHandler}
                        required
                    />
                    {inputValues.password && isPasswordValid ? (
                        <AiOutlineCheck className='fill-green-400 text-[2rem] self-end'></AiOutlineCheck>
                    ) : (
                        <AiOutlineClose className='fill-red-400 text-[2rem] self-end'></AiOutlineClose>
                    )}
                </div>
                <div className='flex items-center gap-3 w-full'>
                    <input
                        type='password'
                        name='confirmPassword'
                        className='input'
                        placeholder='Confirm Password'
                        autoComplete='false'
                        value={inputValues.confirmPassword}
                        onChange={changeHandler}
                        required
                    />
                    {inputValues.confirmPassword &&
                        (isConfirmPasswordValid ? (
                            <AiOutlineCheck className='fill-green-400 text-[2rem] self-end'></AiOutlineCheck>
                        ) : (
                            <AiOutlineClose className='fill-red-400 text-[2rem] self-end'></AiOutlineClose>
                        ))}
                </div>
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
