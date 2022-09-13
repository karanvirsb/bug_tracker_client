import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../Hooks/useRefreshToken";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import Spinner from "../Spinner";
import axiosPrivate from "../AxiosInterceptors";
import { setUser } from "../../Redux/Slices/userSlice";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const auth = useAppSelector((state) => state.auth);
    const persist = useAppSelector((state) => state.persist.persist);
    const user = useAppSelector((state) => state.persistedReducer.user);
    const dispatch = useAppDispatch();
    const effectRan = useRef(false);

    useEffect(() => {
        if (
            effectRan.current === true ||
            process.env.NODE_ENV !== "development"
        ) {
        }
        let isMounted = true;
        const verifyRefreshToken = async () => {
            console.log("verifying refresh token");
            try {
                // const resp =
                await refresh();
                // console.log(resp);
            } catch (error) {
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        // we need to have access to the accessToken before we can verifyREfreshToken

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => {
            isMounted = false;
            effectRan.current = true;
        };
    }, [auth.accessToken, refresh]);

    useEffect(() => {
        const getUserInfo = async (token: string) => {
            const resp = await axiosPrivate("/user/id", {
                method: "post",
                data: {
                    filter: "username",
                    filterValue: auth.username,
                },
                headers: { Authorization: `Bearer ${token}` },
            });
            if (resp) {
                const user = resp.data;
                const roles: string[] = Object.values(user.roles);
                dispatch(
                    setUser({
                        avatar: user.avatar,
                        username: user.username,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isAdmin: roles?.includes("1990") ?? false,
                        isEditor: roles?.includes("1991") ?? false,
                    })
                );
            }
        };

        if (auth.username && auth.accessToken && persist && !user.username) {
            getUserInfo(auth.accessToken);
        }
    }, [auth.username, auth.accessToken, persist, user, dispatch]);

    const persistTernary: JSX.Element = isLoading ? (
        <div className='fixed inset-0 flex justify-center items-center'>
            <div className='bg-black w-20 h-20 rounded-lg flex justify-center items-center'>
                <Spinner></Spinner>
            </div>
        </div>
    ) : (
        <Outlet></Outlet>
    );

    return <>{!persist ? <Outlet></Outlet> : persistTernary}</>;
};

export default PersistLogin;
