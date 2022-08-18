import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../API/axios";
import decoder, { IDecode } from "../../Helper/decodeToken";
import socket from "../../API/sockets";
import { useAppDispatch } from "../../Hooks/hooks";
import { setAuth } from "../../Auth/authenticationSlice";
import { setUser } from "../../Redux/Slices/userSlice";
import Spinner from "../../Components/Spinner";
import { AxiosError } from "axios";

type States = {
    login: {
        username: string;
        password: string;
    };
};

const Login = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [inputValues, setInputValues] = useState<States["login"]>({
        username: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const changedValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        setIsLoading(true);
        e.preventDefault();
        if (!inputValues.username) {
            toast.error("Invalid username");
            setIsLoading(false);
            return;
        }
        if (!inputValues.password) {
            toast.error("Invalid password");
            setIsLoading(false);
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

            const userData = response?.data;
            // once accesstoken received decode to get group id
            if (!userData.accessToken) {
                toast.error("Server Error, Please try to login again.");
                setIsLoading(false);
                return;
            }

            const userInfo: IDecode | undefined = decoder(userData.accessToken);

            if (!userInfo) {
                toast.error("Error: Please try to login again.");
                setIsLoading(false);
            }

            // set auth to roles along with group id
            dispatch(
                setAuth({
                    username: inputValues.username,
                    roles: userInfo?.UserInfo.roles,
                    group_id: userInfo?.UserInfo.group_id,
                    accessToken: userData.accessToken,
                })
            );

            const roles: string[] = userInfo?.UserInfo.roles ?? [];
            dispatch(
                setUser({
                    avatar: userData.avatar,
                    username: inputValues.username,
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    isAdmin: roles.includes("1990") ?? false,
                    isEditor: roles.includes("1991") ?? false,
                })
            );
            // if it exists go to home page otherwise go to
            if (userInfo?.UserInfo.group_id) {
                socket.connect();
                socket.emit("joinRoom", {
                    roomId: userInfo?.UserInfo?.group_id,
                    username: userInfo.UserInfo.username,
                });
                navigate("/dashboard", { replace: true });
                setIsLoading(false);
            } else {
                // else go to add group page
                navigate("/add-group", { replace: true });
                setIsLoading(false);
            }

            setInputValues((prev) => {
                return { ...prev, username: "", password: "" };
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                if (
                    err.response?.status === 401 ||
                    err.response?.status === 400
                ) {
                    toast.error(err.response.data.message);
                } else {
                    const errorResp = JSON.parse(err.response?.data.message);
                    errorResp.forEach(
                        (elem: {
                            code: string;
                            inclusive: boolean;
                            message: string;
                            minimum?: number;
                            maxiumum?: number;
                            path: string[];
                            type: string;
                        }) => {
                            toast.error(elem.path[0] + " " + elem.message);
                        }
                    );
                }
            } else {
                toast.error("Server Error");
            }
            setIsLoading(false);
        }
    };

    return (
        <section className='bg-main-color w-full min-h-screen flex justify-center items-center px-3 login-background'>
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
                    <button className='btn bg-secondary-color text-black flex justify-center items-center text-lg hover:outline-secondary-color transition-colors'>
                        {isLoading ? <Spinner></Spinner> : "Login"}
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
