import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../Hooks/useRefreshToken";
import { useAppSelector } from "../../Hooks/hooks";
import Spinner from "../Spinner";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const auth = useAppSelector((state) => state.persistedReducer.auth);
    const persist = useAppSelector((state) => state.persist.persist);

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        // we need to have access to the accessToken before we can verifyREfreshToken

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => {
            isMounted = false;
        };
    }, [auth.accessToken, refresh]);

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
