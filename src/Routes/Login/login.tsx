import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../API/axios";
import { IStates } from "../../Context/AuthProvider";
import decoder, { IDecode } from "../../Helper/decodeToken";
import useAuth from "../../Hooks/useAuth";

type States = {
    login: {
        username: string;
        password: string;
    };
};

const Login = (): JSX.Element => {
    const { setAuth }: IStates = useAuth();
    const navigate = useNavigate();
    const location: any = useLocation();
    const from = location.state?.from?.pathname || "/";

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

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        if (!inputValues.username) {
            toast.error("Invalid username");
            return;
        }
        if (!inputValues.password) {
            toast.error("Invalid password");
            return;
        }

        try {
            const response = await axiosPrivate.post(
                "/login",
                {
                    username: inputValues.username,
                    password: inputValues.password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            const accessToken = response?.data?.accessToken;
            // once accesstoken received decode to get group id
            if (!accessToken) {
                toast.error("Server Error, Please try to login again.");
                return;
            }

            const userInfo: IDecode | undefined = decoder(accessToken);

            if (!userInfo) {
                toast.error("Error: Please try to login again.");
            }

            // set auth to roles along with group id
            if (setAuth) {
                setAuth({
                    username: inputValues.username,
                    roles: userInfo?.UserInfo.roles,
                    group_id: userInfo?.UserInfo.group_id,
                    accessToken,
                });
            }

            // if it exists go to home page otherwise go to
            if (userInfo?.UserInfo.group_id) {
                navigate(from, { replace: true });
            } else {
                // else go to add group page
                navigate("/add-group", { replace: true });
            }

            setInputValues((prev) => {
                return { ...prev, username: "", password: "" };
            });
        } catch (err: any) {
            let errMsg = "";
            if (err?.response) {
                errMsg = "No Server Response";
            } else if (err.response?.status === 400) {
                errMsg = "The username or password was incorrect";
            } else if (err.response?.status === 401) {
                errMsg = "Unauthorized";
            } else {
                errMsg = "Login Failed";
            }

            toast.error(errMsg);
        }
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
